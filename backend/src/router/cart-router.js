const { Router } = require('express')
const cartController = require('../controllers/cart-controller')


const cartRouter = new Router()

cartRouter.post("/seed", cartController.seedUserCart)
cartRouter.post('/create', cartController.createUserCart)
cartRouter.post('/create-anonimous', cartController.createAnonimousCart)
cartRouter.get("/check-anonimous/:anonimousCartId", cartController.checkAnonimousCart)
cartRouter.post("/merge-user-cart", cartController.mergeUserCart)
cartRouter.put("/add", cartController.addToCart)
cartRouter.delete("/remove", cartController.removeFromCart)
cartRouter.put("/increment", cartController.increment)
cartRouter.put("/decrement", cartController.decrement)
cartRouter.put("/toggle", cartController.toggle)

cartRouter.get("/find/:userId", cartController.getUserCart)
cartRouter.get("/check/whether-cart-exists/:userId", cartController.checkWhetherCartExists)

module.exports = cartRouter