const discountController = require('../controllers/discount-controller')

const Router = require("express").Router


const discountRouter = new Router()

discountRouter.put("/grant", discountController.grantDiscount)
discountRouter.put('/use', discountController.useDiscount)

discountRouter.delete("/delete", discountController.deleteDiscount)

discountRouter.get("/all", discountController.getAllDiscounts)
discountRouter.get('/single/:userId', discountController.getAllUserDiscounts)
discountRouter.get("/check", discountController.checkUserPromocode)


module.exports = discountRouter