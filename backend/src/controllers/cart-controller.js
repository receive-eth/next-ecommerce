const cartService = require("../services/cart-service")
const cartHelper = require("../helpers/cart-helper")
class CartController {

	async checkWhetherCartExists(req, res, next) {
		try {
			const userId = req.params?.userId
			const result = await cartHelper.checkWhetherCartExists(userId)
			res.json(result)
		} catch(e) {
			next(e)
		}
	}

	async seedUserCart(req, res, next) {
		try {
			const userId = req.body?.userId || req.body?.cartId
			const productId = req.body?.productId
			const sizeId = req.body?.sizeId
			const count = req.body?.count
			const result = await cartService.seedUserCart(userId, productId, sizeId, count)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async createUserCart(req, res, next) {
		try {
			const userId = req.body?.userId || req.body?.cartId
			const productId = req.body?.productId
			const result = await cartService.createUserCart(userId, productId)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async createAnonimousCart(req, res, next) {
		try {
			const productId = req.body?.productId
			const sizeId = req.body?.sizeId
			const count = req.body?.count

			const result = await cartService.createAnonimousCart(
				productId,
				sizeId,
				count
			)
			res.json(result)
		} catch(e) {
			next(e)
		}
	}

	async checkAnonimousCart(req, res, next) {
		try {
			const anonimousCartId = req.params.anonimousCartId
			const result = await cartService.checkAnonimousCart(anonimousCartId)
			res.json(result)
		} catch(e) {
			next(e)
		}
	}

	async mergeUserCart(req, res, next) {
		try {
			const anonimousCartId = req?.body?.anonimousCartId
			const loggedInUserId = req?.body?.loggedInUserId
			const result = await cartService.mergeUserCart(
				anonimousCartId,
				loggedInUserId
			)
			res.json(result)
		} catch(e) {
			next(e)
		}
	}

	async addToCart(req, res, next) {
		try {
			const cartId = req.body?.userId || req.body?.cartId
			const productId = req.body?.productId
			const result = await cartService.addToCart(cartId, productId)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async removeFromCart(req, res, next) {
		try {
			const cartId = req.body?.userId || req.body?.cartId
			const productIds = req.body?.productIds
			const result = await cartService.removeFromCart(cartId, productIds)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async increment(req, res, next) {
		try {
			const cartId = req.body?.userId || req.body?.cartId
			const productId = req.body?.productId
			const result = await cartService.increment(cartId, productId)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async decrement(req, res, next) {
		try {
			const cartId = req.body?.userId || req.body?.cartId
			const productId = req.body?.productId
			const result = await cartService.decrement(cartId, productId)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async toggle(req, res, next) {
		try {
			const cartId = req.body?.userId || req.body?.cartId
			const cartItemIds = req.body?.cartItemIds
			const isSelected = req.body?.isSelected
			const result = await cartService.toggle(cartId, cartItemIds, isSelected)
			res.json(result)
		} catch(e) {
			next(e)
		}
	}

	async getProductSizes(req, res, next) {
		try {
			const productId = req.params?.productId
			const result = await cartService.getProductSizes(productId)
			res.json(result)
		} catch(e) {
			next(e)
		}
	}

	async getUserCart(req, res, next) {
		try {
			const { userId } = req.params
			const result = await cartService.getUserCart(userId)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new CartController()