const Router = require("express").Router
const favoitesController = require("../controllers/favoites-controller")
const favoritesRouter = new Router()

favoritesRouter.get('/get-user-favorites/:userId', favoitesController.getUserFavoritesList)

favoritesRouter.post('/add', favoitesController.addToFavorites)
favoritesRouter.delete("/remove", favoitesController.removeFromFavorites)


module.exports = favoritesRouter