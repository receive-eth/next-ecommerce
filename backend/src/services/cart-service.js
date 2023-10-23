const prisma = require('../../config/prismaClient')
const ApiError = require('../exceptions/api-error')
const cartHelper = require('../helpers/cart-helper')
const productService = require('../services/product-service')
const uuid = require('uuid')

class CartService {
	async seedUserCart(userId = "", productId, sizeId, count = 1) {
		const { cartId, items } = await cartHelper.checkWhetherCartExists(userId)

		if (cartId) {
			return await this.addToCart(cartId, productId, sizeId, items, count)
		} else {
			return await this.createUserCart(userId, productId, sizeId, count)
		}
	}

	async createUserCart(userId, productId, sizeId, count = 1) {
		const result = await prisma.cart.create({
			data: {
				user: { connect: { userId } },
				Items: {
					create: {
						productId,
						size: {
							connect: {
								sizeId,
							},
						},
						count,
					},
				},
			},
			select: {
				cartId: true,
				Items: true,
			},
		})
		return result
	}


	async createAnonimousCart(productId, sizeId, count) {
		const firstName = `anonimous_user`
		const lastName = `${uuid.v4()}`

		const createdUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				gender: "",
				email: firstName + lastName + `@gmail.com`,
				password: uuid.v4(),
				activationLink: "",
			},
			select: {
				userId: true,
				createdAt: true
			}
		})

		return createdUser
	}

	async checkAnonimousCart(anonimousCartId = 'asd') {
		const result = await prisma.user.findUnique({
			where: { userId: anonimousCartId },
		})

		if (!result) {
			return this.createAnonimousCart()
		}
		return result
	}

	async mergeUserCart(anonimousCartId, loggedInUserId) {
		const anonimousCartItems = await prisma.cart.findUnique({
			where: { cartId: anonimousCartId },
			select: { Items: { include: { size: true } } },
		})

		for (let item of anonimousCartItems?.Items) {
			await Promise.all(item.size.map((i) => {
				this.seedUserCart(loggedInUserId, item.productId, i.sizeId, item.count)
			}))
		}

		await prisma.user.delete({
			where: { userId: anonimousCartId }
		})
	}

	async addToCart(cartId, productId, sizeId, items = [], count = 1) {
		let sizeIds = []
		if (items.length > 0) {
			sizeIds = items.map((el) => {
				if (el.size[0].sizeId === sizeId) return sizeId
			})
		}

		if (sizeIds.includes(sizeId)) {
			return await this.increment(cartId, productId)
		}

		const result = await prisma.cart.update({
			where: {
				cartId,
			},
			data: {
				Items: {
					create: {
						productId,
						size: {
							connect: {
								sizeId,
							},
						},
						count,
					},
				},
			},
		})
		return result
	}

	async removeFromCart(cartId, productIds = []) {
		const result = await prisma.cart.update({
			where: {
				cartId,
			},
			data: {
				Items: {
					deleteMany: {
						productId: { in: productIds },
					},
				},
			},
			select: {
				cartId: true,
				Items: { select: { productId: true, count: true } },
			},
		})

		return result
	}

	async increment(cartId, productId) {
		const result = await prisma.cartItem.updateMany({
			where: {
				cartId: { equals: cartId },
				productId: { equals: productId },
			},
			data: { count: { increment: 1 } },
		})

		console.log("result: ", result)
		return await this.getUserCart(cartId)

		// return result
	}

	async decrement(cartId, productId) {
		const result = await prisma.cartItem.updateMany({
			where: {
				cartId: { equals: cartId },
				productId: { equals: productId },
			},
			data: { count: { decrement: 1 } },
		})

		return await this.getUserCart(cartId)
	}

	async toggle(cartId, cartItemIds, isSelected) {
		const result = await prisma.cartItem.updateMany({
			where: {
				cartId: { equals: cartId },
				id: { in: cartItemIds },
			},
			data: {
				isSelected,
			},
		})

		return await this.getUserCart(cartId)
	}

	async getProductSizes(productId) {
		const result = await prisma.size.findMany({
			where: {
				product: {
					every: {
						productId: { equals: productId },
					},
				},
			},
		})
		return result
	}

	async getUserCart(userId) {
		const result = await prisma.user.findUnique({
			where: { userId },
			select: {
				cart: {
					include: {
						Items: {
							select: {
								id: true,
								productId: true,
								count: true,
								size: true,
								isSelected: true,
								productInfo: {
									select: {
										name: true,
										images: true,
										price: true,
										size: true,
										color: true,
										article: true,
										category: true,
										menuCategory: true,
										brand: true,
										slug: true,
									},
								},
							},
							orderBy: {
								productInfo: {
									price: "desc",
								},
							},
						},
					},
				},
			},
		})

		if (!result?.cart) throw ApiError.BadRequest("Cart not found")

		const response = result?.cart?.Items?.map((item) => {
			return {
				id: item.id,
				productId: item.productId,
				name: item.productInfo.name,
				images: item.productInfo.images,
				price: item.productInfo.price,
				size: item.size[0],
				allSizes: item.productInfo.size,
				isSelected: item.isSelected,
				avaliableSizeCount: item.size[0].stock,
				count: item.count,
				color: item.productInfo.color.name,
				brand: item.productInfo.brand.name,
				category: item.productInfo.category,
				menuCategory: item.productInfo.menuCategory,
				article: item.productInfo.article,
				slug: item.productInfo.slug,
			}
		})

		return response
	}
}

module.exports = new CartService()