const productService = require('../services/product-service')
const productHelper = require('../helpers/product-helper')


class ProductController {
	async createProduct(req, res, next) {
		try {
			const product = req.body
			await productService.checkWhetherProductExists(
				product.article,
				product.name
			)
			const imageLinks = await productService.batchUploadToCloudinary(
				product.images,
				product.article
			)

			product.images = imageLinks
			const newProduct = await productService.createProduct(product)
			res.json(newProduct)
		} catch (e) {
			next(e)
		}
	}

	async deleteProduct(req, res, next) {
		try {
			const product = req.body
			const deletedProduct = await productService.deleteProduct(product)
			res.json(deletedProduct)
		} catch (e) {
			next(e)
		}
	}

	async updateProduct(req, res, next) {
		try {
			const product = req.body
			const updatedProduct = await productService.updateProduct(product)
			res.json(updatedProduct)
		} catch (e) {
			next(e)
		}
	}

	async getAllProductsPaginated(req, res, next) {
		try {
			const PER_PAGE = 20
			const query = req.query
			const currentPage = Math.max(Number(query.page || 1), 1)

			const capitalized =
				query.category[0].toUpperCase() + query.category.substring(1)
			req.query.category = capitalized
			const category = query?.category

			const brands = productHelper.queryToArray(query.brand)
			const colors = productHelper.queryToArray(query.color)

			let minPrice
			let maxPrice

			if (query.price) [minPrice, maxPrice] = query.price.split("-")

			const sortby = productHelper.getSortOptions(query.sortby)

			const paginationOptions = {
				where: {
					menuCategory: category,
					price: {
						lte: Number(maxPrice) || undefined,
						gte: Number(minPrice) || undefined,
					},
				},
				include: {
					brand: {
						select: {
							name: true,
						},
					},
					color: {
						select: {
							name: true,
						},
					},
				},
				take: PER_PAGE,
				skip: (currentPage - 1) * PER_PAGE,
				orderBy: {
					...sortby,
				},
			}

			const { filterOptions, countOptions } = productHelper.getFilterOptions(
				paginationOptions,
				{ brand: brands, color: colors },
				category
			)

			const isDefaultAggregation =
				minPrice !== undefined && maxPrice !== undefined

			const aggregationValues = {
				brands,
				colors,
				isDefaultAggregation,
				category,
			}

			const products = await productService.getAllProducts(
				filterOptions,
				countOptions,
				aggregationValues
			)
			res.json(products)
		} catch (e) {
			next(e)
		}
	}

	async getAllProducts(req, res, next) {
		try {
			const products = await productService.getAllProducts()
			res.json(products)
		} catch (e) {
			next(e)
		}
	}

	async getProductByArticle(req, res, next) {
		try {
			const article = req.params.article
			const product = await productService.getProductByArticle(article)
			res.json(product)
		} catch (e) {
			next(e)
		}
	}

	async getProductByName(req, res, next) {
		try {
			const name = req.params.name
			const product = await productService.getProductByName(name)
			res.json(product)
		} catch (e) {
			next(e)
		}
	}

	async getProductsByMenuCategory(req, res, next) {
		try {
			const menuCategory = req.params.category
			const products = await productService.getProductsByMenuCategory(
				menuCategory
			)
			res.json(products)
		} catch (e) {
			next(e)
		}
	}

	async getProductBySlug(req, res, next) {
		try {
			const productSlug = req.params.slug
			const product = await productService.getProductBySlug(productSlug)
			res.json(product)
		} catch (e) {
			next(e)
		}
	}

	async getAvailableFilterPositions(req, res, next) {
		try {
			const query = req.query
			const result = await productService.getAvailableFilterPositions(
				query.brands,
				query.colors,
				query.price,
				query.category
			)

			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async addSizeToProduct(req, res, next) {
		try {
			const productId = req.body?.productId
			const size = req.body?.size
			const result = await productService.addSizeToProduct(productId, size)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async deleteSizeFromProduct(req, res, next) {
		try {
			const productId = req.body?.productId
			const sizeId = req.body?.sizeId
			const result = await productService.deleteSizeFromProduct(productId, sizeId)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async getProductSizes(req, res, next) {
		try {
			const productId = req.params?.productId
			const result = await productService.getProductSizes(productId)
			res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async getDefaultFilterPrices(req, res, next) {
		try {
			const result = await productService.ge
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new ProductController()