// require("dotenv").config()

const userService = require("../services/user-service")
const { validationResult } = require("express-validator")
const ApiError = require("../exceptions/api-error")

// В контроллере нужно получить результат валидации  через ф-цию validationResult(req).
// Возвращает массив ошибок. Если их нет, то пустой массив.

class UserController {
	async registration(req, res, next) {
		try {
			// получаем результат валидации, ошибки, если  есть
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				// Передаем ошибку в middleware api handler
				return next(
					ApiError.BadRequest("Ошибка при валидации !", errors.array())
				)
			}

			const { firstName, lastName, gender, email, password } = req.body
			const promocode = process.env.DEFAULT_PROMOCODE

			const userData = await userService.registration(
				firstName,
				lastName,
				gender,
				email,
				password,
				promocode
			)

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			// return res.json(userData)
			res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await userService.login(email, password)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.logout(refreshToken)
			res.clearCookie("refreshToken")
			return res.json(token)
		} catch (e) {
			next(e)
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.refresh(refreshToken)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers()
			return res.json(users)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new UserController()
