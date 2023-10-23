const userController = require("../controllers/user-controller")
const Router = require('express').Router
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

const userRouter = new Router()

// Функцию body передаем как middleware в наш роутинг, вызываем ее и передаем туда название поля, которое нужно провалидировать

userRouter.post(
	"/registration",
	body("email").isEmail(), // validation middleware
	body("password").isLength({ min: 3, max: 32 }), // validation middleware
	userController.registration
)

userRouter.post("/login", userController.login)
userRouter.post("/logout", userController.logout)

userRouter.get(`/activate/:link`, userController.activate)
userRouter.get("/refresh", userController.refresh)

userRouter.get(
	"/users",
	// authMiddleware,
	// roleMiddleware(["ADMIN"]),
	userController.getUsers
)

module.exports = userRouter
