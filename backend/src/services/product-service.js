const ApiError = require("../exceptions/api-error")
const prisma = require("../../config/prismaClient")
const cloudinary = require("../../config/cloudinaryConfig")
const productHelper = require("../helpers/product-helper")

class ProductService {
	async createProduct({
		name,
		description,
		size,
		brand,
		color,
		images,
		price,
		category,
		menuCategory,
		article,
		slug,
	}) {
		const product = await prisma.product.create({
			data: {
				name,
				description,
				brand: {
					connectOrCreate: {
						where: {
							name: brand,
						},
						create: {
							name: brand,
						},
					},
				},
				color: {
					connectOrCreate: {
						where: {
							name: color,
						},
						create: {
							name: color,
						},
					},
				},
				size: {
					create: {
						sm: size.sm,
						eu: size.eu,
						uk: size.uk,
						us: size.us,
						stock: size.stock,
					},
				},
				images,
				price,
				category,
				menuCategory,
				article,
				slug,
			},
		})

		return product
	}

	async deleteProduct({ article }) {
		const candidate = await prisma.product.findUnique({
			where: {
				article,
			},
		})

		if (candidate) {
			const deletedProduct = await prisma.product.delete({
				where: {
					article,
				},
			})
			return deletedProduct
		}

		throw ApiError.BadRequest("Товара с таким артикулом не существует")
	}

	async updateProduct({
		article,
		name,
		description,
		brand,
		images,
		price,
		category,
		stock,
		slug,
	}) {
		const candidate = await prisma.product.findUnique({
			where: {
				article,
			},
		})

		if (candidate) {
			const updatedProduct = await prisma.product.update({
				where: {
					article,
				},
				data: {
					name,
					description,
					brand,
					images,
					price,
					category,
					article,
					stock,
					slug,
				},
			})
			return updatedProduct
		}
	}

	async getAllProducts(
		options = {},
		countOptions = {},
		aggregationValues = {}
	) {
		const promises = productHelper.getPromisesArray(
			options,
			countOptions,
			aggregationValues?.category,
			aggregationValues?.isDefaultAggregation,
			aggregationValues?.brands,
			aggregationValues?.colors
		)

		const [products, totalCount, defaultLimitValues, initialPrices] =
			await prisma.$transaction(promises)

		return {
			totalCount,
			products,
			defaultLimitValues: {
				min: defaultLimitValues._min.price,
				max: defaultLimitValues._max.price,
			},
			prices: {
				min: initialPrices?._min?.price,
				max: initialPrices?._max?.price,
			},
		}
	}

	async getProductByArticle(article) {
		const product = await prisma.product.findUnique({
			where: {
				article,
			},
		})
		return product
	}

	async getProductByName(name) {
		const formatedName = name.replace(/-/gi, " ")
		const product = await prisma.product.findMany({
			where: {
				name: {
					equals: formatedName,
					mode: "insensitive",
				},
			},
		})
		return product
	}

	async getProductsByMenuCategory(menuCategory) {
		const products = await prisma.product.findMany({
			where: {
				menuCategory,
			},
		})
		return products
	}

	async getProductBySlug(productSlug) {
		const product = await prisma.product.findUnique({
			where: {
				slug: productSlug,
			},
			include: {
				size: {
					select: {
						sizeId: true,
						sm: true, 
						eu: true,
						uk: true,
						us: true,
						stock: true
					}
				}
			}
		})
		return product
	}

	async getAvailableFilterPositions(brands, colors, price, category) {
		let allBrands, allColors, prices, capitalizedCategory

		if (category) {
			capitalizedCategory = category[0].toUpperCase() + category.substring(1)
		}

		const [minPrice, maxPrice] = price.split("-")

		if (minPrice === "undefined" || maxPrice === "undefined") price = undefined

		if (!brands && !colors && !price) {
			[allBrands, allColors, prices] = await prisma.$transaction([
				prisma.brand.findMany({
					where: {
						products: {
							some: {
								menuCategory: { equals: capitalizedCategory },
							},
						},
					},
					orderBy: {
						name: "asc",
					},
				}),
				prisma.color.findMany({
					where: {
						products: {
							some: {
								menuCategory: { equals: capitalizedCategory },
							},
						},
					},
					orderBy: {
						name: "asc",
					},
				}),
				prisma.product.aggregate({
					_min: {
						price: true,
					},
					_max: {
						price: true,
					},
					where: {
						menuCategory: {
							equals: capitalizedCategory,
						},
					},
				}),
			])

			const receivedPrices = {
				min: prices._min.price,
				max: prices._max.price,
			}

			return {
				brands: allBrands,
				colors: allColors,
				prices: receivedPrices,
			}
		}

		const brandOptions = productHelper.getFilterPositionsOptions(
			"color",
			colors,
			price,
			capitalizedCategory
		)
		const colorsOptions = productHelper.getFilterPositionsOptions(
			"brand",
			brands,
			price,
			capitalizedCategory
		)

		const [brandsRes, colorsRes, pricesRes] = await prisma.$transaction([
			prisma.brand.findMany(brandOptions),
			prisma.color.findMany(colorsOptions),
			prisma.product.aggregate({
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
						equals: capitalizedCategory,
					},
				},
			}),
		])

		const resultPrices = {
			min: pricesRes._min.price,
			max: pricesRes._max.price,
		}

		return {
			brands: brandsRes,
			colors: colorsRes,
			prices: resultPrices,
		}
	}

	async addSizeToProduct(productId, size) {
		const result = await prisma.product.update({
			where: {
				productId,
			},
			data: {
				size: {
					create: {
						sm: size.sm,
						eu: size.eu,
						uk: size.uk,
						us: size.us,
						stock: size.stock,
					},
				},
			},
		})
		return result
	}

	async deleteSizeFromProduct(productId, sizeId) {
		const result = await prisma.product.update({
			where: {
				productId,
			},
			data: {
				size: {
					deleteMany: {
						sizeId,
					},
				},
			},
		})

		return result
	}

	async getProductSizes(productId) {
		const result = await prisma.product.findUnique({
			where: {
				productId,
			},
			select: {
				size: true,
			},
		})
		return result
	}

	async batchUploadToCloudinary(imageArray, article) {
		const uploadedImages = []
		for (let i = 0; i < imageArray.length; i++) {
			const result = await cloudinary.uploader.upload(
				imageArray[i],
				{
					upload_preset: "product_preset",
					public_id: `article:${article}/order:${i + 1}`,
					allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "webp"],
				},
				function (error, result) {
					if (error) {
						console.log(error)
					}
				}
			)
			uploadedImages.push(result.secure_url)
		}
		return uploadedImages
	}

	async checkWhetherProductExists(productArticle, productName) {
		const candidate = await prisma.product.findMany({
			where: {
				OR: [
					{
						article: {
							equals: productArticle,
						},
					},
					{
						name: {
							equals: productName,
							mode: "insensitive",
						},
					},
				],
			},
		})

		if (candidate.length !== 0) {
			throw ApiError.BadRequest(
				"Товар с таким артикулом или именем уже существует"
			)
		}
	}

	async checkWhetherProductExistsById(productId) {
		if (!productId) throw ApiError.BadRequest("Вы не указали productId")

		const result = await prisma.product.findUnique({
			where: { productId },
		})

		return result
	}
}

module.exports = new ProductService()
