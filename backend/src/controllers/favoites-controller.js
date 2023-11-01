const favoritesService = require('../services/favorites-service')

class FavoritesController {
	async getUserFavoritesList(req, res, next) {
        try {
            const userId = req.params?.userId
            const result = await favoritesService.getUserFavoritesList(userId)
            res.json(result)
        } catch(e) {
            next(e)
        }
    }

	async addToFavorites(req, res, next) {
        try {
            const userId = req.body?.userId
            const productId = req.body?.productId
            const result = await favoritesService.addToFavorites(userId, productId)
            res.json(result)
        } catch(e) {
            next(e)
        }
    }

	async removeFromFavorites(req, res, next) {
        try {
            const userId = req.body?.userId
            const productId = req.body?.productId

            const result = await favoritesService.removeFromFavorites(userId, productId)
            res.json(result)
        } catch(e) {
            next(e)
        }
    }
}


module.exports = new FavoritesController()