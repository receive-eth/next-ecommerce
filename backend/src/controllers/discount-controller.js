const discountService = require('../services/discount-service')

class DiscountController {

    async deleteDiscount(req, res, next) {
        try {
            const { promocode } = req.body
            const result = await discountService.deleteDiscount(promocode)
            return res.json(result)
        } catch(e) {
            next(e)
        }
    }

    async grantDiscount(req, res, next) {
        try {
            const { userId, promocode, percent, maxActivations } = req.body
            const result = await discountService.grantDiscount(userId, promocode, percent, maxActivations)
            return res.json(result)
        } catch(e) {
            next(e)
        }
    }

    async useDiscount(req, res, next) {
        try {
            const userId = req.body?.userId || req.body.cartId
            const promocode = req.body.promocode
            const result = await discountService.useDiscount(userId, promocode)
            return res.json(result)
        } catch(e) {
            next(e)
        }
    }

    async getAllDiscounts(req, res, next) {
        try {
            const result = await discountService.getAllDiscounts()
            return res.json(result)
        } catch(e) {
            next(e)
        }
    }

    async getAllUserDiscounts(req, res, next) {
        try {
            const userId = req.params?.userId
            const result = await discountService.getAllUserDiscounts(userId)
            return res.json(result)
        } catch(e) {
            next(e)
        }
    }

    async checkUserPromocode(req, res, next) {
        try {
            const { userId, promocode } = req.query
            const result = await discountService.checkUserPromocode(userId, promocode)
            return res.json(result)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new DiscountController()