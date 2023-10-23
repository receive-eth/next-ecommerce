const prisma = require("../../config/prismaClient")

class CartHelper {
	async checkWhetherCartExists(userId) {
	    const result = await prisma.user.findUnique({
	        where: { userId },
	        select: { cart: {include: { Items: { select: { id: true, count: true, size: true } } }} }
	    })

	    const response = { cartId: result?.cart?.cartId, items: result?.cart?.Items }
	    return response
	}
}

module.exports = new CartHelper()