const prisma = require("../../config/prismaClient")
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require ("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")

class UserService {
	async registration(firstName, lastName, gender, email, password, promocode) {

		const candidate = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (candidate) throw ApiError.BadRequest("Пользователь уже существует !")

		const hashedPassword = await bcrypt.hash(password, 3)
		const activationLink = uuid.v4()

		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				gender,
				email,
				password: hashedPassword,
				activationLink,
				Favorite: {
					create: {}
				},
				cart: {
					create: {}
				}
			},
		})

		// await mailService.sendActivationMail(
		// 	email,
		// 	`${process.env.API_URL}/api/activate/${activationLink}`
		// )

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async activate(activationLink) {
		const user = await prisma.user.findFirst({
			where: {
				activationLink: activationLink.slice(0, -1),
			},
		})

		if (!user) {
			throw ApiError.BadRequest("Некорректная ссылка активации")
		}

		await prisma.user.update({
			where: {
				userId: user.userId,
			},
			data: {
				isActivated: true,
			},
		})
	}

	async login(email, password) {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})


		if (!user) {
			throw ApiError.BadRequest('Пользователь не найден !')
		}

		const isPassEqual = await bcrypt.compare(password, user.password) 
		if(!isPassEqual) {
			throw ApiError.BadRequest("Неверный пароль !")
		}

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({...userDto})

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {...tokens, user: userDto}
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnathorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDatabase = await tokenService.findTokenInDatabase(refreshToken)
		
		if(!userData && !tokenFromDatabase) {
			throw ApiError.UnathorizedError()
		}
		const user = await prisma.user.findUnique({
			where: {
				userId: userData.id,
			},
		})

		const userDto = new UserDto(user)

		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	}

	async getAllUsers() {
		const users = await prisma.user.findMany({
			include: {
				cart: {
					select: {
						cartId: true,
						Items: {select: { productId: true, count: true, size: true, productInfo: {select: {size: true}}, }}
					}
				},
			}
		})
		return users
	}
}

module.exports = new UserService()