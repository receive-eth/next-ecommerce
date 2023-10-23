const prisma = require("../../config/prismaClient")

class ProductHelper {
	getFilterOptions = (filterOptions, funcOptions, category) => {
		const funcOptionsKeys = Object.keys(funcOptions)
		const filtredFuncOptionsKeys = funcOptionsKeys.filter(
			(el) => el !== undefined
		)
		for (let itr of filtredFuncOptionsKeys) {
			if (funcOptions[itr].filter((el) => el !== undefined).length !== 0) {
				filterOptions.where[itr] = { name: { in: funcOptions[itr] } }
			}
		}

		// filterOptions.where.menuCategory = { equals: category }

		const countOptions = {
			where: filterOptions.where,
		}

		return { filterOptions, countOptions }
	}

	formatDB = (array) => {
		return array.map((el, i, array) => {
			if (el) {
				return el.replace("-", " ")
			} else {
				array.splice(i, 1)
			}
		})
	}

	queryToArray = (query) => {
		const result = Array.isArray(query)
			? this.formatDB(query)
			: this.formatDB([query])
		return result
	}

	getSortOptions = (query) => {
		const result = {}
		if (query !== undefined && query !== null && query !== "") {
			const splittedQuery = query.split(",")
			const key = splittedQuery[0]
			const value = splittedQuery[1]
			switch (value) {
				case `low-to-high`:
					result[key] = "asc"
					break
				case "high-to-low":
					result[key] = "desc"
					break
				default:
					result.article = "asc"
			}
		}

		return result
	}

	getFilterPositionsOptions = (modelField, array, price, category) => {
		let priceOpt = {}
		let minPrice, maxPrice

		if (price) {
			[minPrice, maxPrice] = price.split("-")
			priceOpt.gte = Number(minPrice)
			priceOpt.lte = Number(maxPrice)
		}

		return {
			where: {
				products: {
					some: {
						[modelField]: {
							name: {
								in: array,
							},
						},
						price: priceOpt,
						menuCategory: {
							equals: category,
						},
					},
				},
			},
			distinct: ["name"],
			orderBy: {
				name: "asc",
			},
		}
	}

	getPromisesArray = (
		options,
		countOptions,
		category,
		isTruth,
		brands,
		colors
	) => {
		const aggrWithValues = prisma.product.aggregate({
			_min: {
				price: true,
			},
			_max: {
				price: true,
			},
			where: {
				brand: {
					name: {
						in: brands,
					},
				},
				color: {
					name: {
						in: colors,
					},
				},
				menuCategory: {
					equals: category,
				},
			},
		})

		const promises = [
			prisma.product.findMany({
				...options,
				include: {
					size: true,
					brand: true,
					color: true,
				}
			}),
			prisma.product.count(countOptions),
			prisma.product.aggregate({
				_min: {
					price: true,
				},
				_max: {
					price: true,
				},
			}),
		]

		if (isTruth) promises.push(aggrWithValues)
		return promises
	}
}

module.exports = new ProductHelper()
