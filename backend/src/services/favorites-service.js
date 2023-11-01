const prisma = require("../../config/prismaClient")
const ApiError = require("../exceptions/api-error")

class FavoritesService {
	async getUserFavoritesList(userId) {
		const result = await prisma.favorite.findUnique({
			where: {
				id: userId,
			},
			select: {
				id: true,
				product: {
					include: {
						size: true
					}
				},
			},
		})

		return result
	}

	async addToFavorites(userId, productId) {
	
		const result = await prisma.favorite.update({
			where: {
				id: userId,
			},
			data: {
				product: {
					connect: {
						productId,
					},
				},
			},
			select: {
				id: true,
				product: {
					include: { size: true },
				},
			},
		})

		return result
	}

	async removeFromFavorites(userId, productId) {
		const result = await prisma.favorite.update({
			where: {
				id: userId,
			},
			data: {
				product: {
                    disconnect: {
                        productId: productId
                    }
				},
			},
			select: {
				id: true,
				product: {
					include: { size: true }
				},
			},
		})

		return result
	}


	async checkIfInFavorites(userId, productId) {
		const result = await prisma.favorite.findUnique({
			where: {
				id: userId,
				product: {
					every: {
						productId: { equals: productId },
					},
				},
			},
		})

		return result
	}
}

module.exports = new FavoritesService()