const productController = require("../controllers/product-controller")
const Router = require("express").Router

const productRouter = new Router()

productRouter.post('/create', productController.createProduct)
productRouter.delete('/delete', productController.deleteProduct)
productRouter.put("/update", productController.updateProduct)

productRouter.put("/add-size-to-product", productController.addSizeToProduct)
productRouter.put("/delete-size-from-product", productController.deleteSizeFromProduct)


productRouter.get("/all", productController.getAllProducts)
productRouter.get("/filter-positions", productController.getAvailableFilterPositions)

productRouter.get("/paginated", productController.getAllProductsPaginated)
productRouter.get("/:name", productController.getProductByName)
productRouter.get("/article/:article", productController.getProductByArticle)
productRouter.get("/by-menu-category/:category", productController.getProductsByMenuCategory)
productRouter.get('/by-slug/:slug', productController.getProductBySlug)
productRouter.get("/product-sizes/:productId", productController.getProductSizes)

module.exports = productRouter