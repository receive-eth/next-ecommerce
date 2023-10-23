const prisma = require("../../config/prismaClient")
const ApiError = require("../exceptions/api-error")

class DiscountService {
	async deleteDiscount(promocode) {
		const result = await prisma.personalDiscount.deleteMany({
			where: {
				promocode: { equals: promocode },
			},
		})

		return result
	}

	async grantDiscount(userId, promocode, percent, maxActivations) {
		const check = await this.checkUserPromocode(userId, promocode)
		console.log("check: ", check)
		if (check === null)
			return await prisma.personalDiscount.create({
				data: {
					userId,
					promocode,
					maxActivations,
					percent,
				},
				select: { user: { include: { discount: true } } },
			})

		if (check.maxActivations === 0)
			return this.addActivations(userId, promocode, maxActivations)

		throw ApiError.BadRequest(
			`User already has this promocode, activations left ${check.maxActivations}`
		)
	}

	async useDiscount(userId, promocode) {
		const result = await this.checkUserPromocode(userId, promocode)

		if (result === null) throw ApiError.BadRequest("Invalid promocode")
		if (result.maxActivations === 0)
			throw ApiError.BadRequest(
				"You have used all the activations of this promo code"
			)

		return await prisma.user.update({
			where: {
				userId,
			},
			data: {
				discount: {
					updateMany: {
						where: { promocode: { equals: promocode } },
						data: { maxActivations: { decrement: 1 } },
					},
				},
			},
			select: { userId: true, discount: true },
		})
	}

	async addActivations(userId, promocode, activationsNumber) {
		const result = await this.checkUserPromocode(userId, promocode)
		if (result === null)
			throw ApiError.BadRequest("User doesn't have this promocode")

		return await prisma.user.update({
			where: { userId },
			data: {
				discount: {
					updateMany: {
						where: { promocode: { equals: promocode } },
						data: { maxActivations: activationsNumber },
					},
				},
			},
			select: { userId: true, discount: true },
		})
	}

	async getAllDiscounts() {
		const result = await prisma.personalDiscount.findMany({
			where: {},
			include: {
				user: true,
			},
		})

		return result
	}

	async getAllUserDiscounts(userId) {
		const result = await prisma.user.findUnique({
			where: {
				userId,
			},
			select: { userId: true, discount: true },
		})

		return result
	}

	async checkUserPromocode(userId, promocode) {
		const result = await prisma.user.findFirst({
			where: {
				userId: { equals: userId },
				discount: { every: { promocode: { equals: promocode } } },
			},
			select: {
				discount: true,
			},
		})

        if (!result) throw ApiError.BadRequest('Provided promocode is unavaliable')

		if (!result || result.discount.length === 0) return null

		const foundDiscount = result.discount[0]

		return foundDiscount
	}
}

module.exports = new DiscountService()
