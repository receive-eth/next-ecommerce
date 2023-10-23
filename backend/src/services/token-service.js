const jwt = require('jsonwebtoken')
const prisma = require("../../config/prismaClient")

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: "1m",
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "30d",
		})
		return {
			accessToken,
			refreshToken,
		}
	}

	async saveToken(userId, refreshToken) {
		// Проверить существует ли refresh token
		const tokenData = await prisma.user.findFirst({
			where: {
				userId,
			},
			include: {
				token: true,
			},
		})

		if (tokenData.token) {
			// Если существует запись - обновить рефреш токен
			await prisma.user.update({
				where: {
					userId,
				},
				data: {
					token: {
						update: {
							where: {
								tokenId: tokenData.token.tokenId,
							},
							data: {
								refreshToken,
							},
						},
					},
				},
			})
			return "Token has been updated"
		}
		// Если записи не существует - пользователь входит 1й раз. Нужно создать такую запись.
		const token = await prisma.user.update({
			where: {
				userId,
			},
			data: {
				token: {
					create: {
						refreshToken,
					},
				},
			},
		})

		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await prisma.token.deleteMany({
			where: {
				refreshToken,
			},
		})
		return tokenData
	}

	async findTokenInDatabase(refreshToken) {
		const tokenData = await prisma.token.findFirst({
			where: {
				refreshToken,
			},
		})
		return tokenData
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch {
			return null
		}
	}
}

module.exports = new TokenService()
