module.exports = class ProductDto {
	// productId
    name
	description
	brand
	image
	price
    category
    article
    stock

	constructor(model) {
		// this.productId = model.productId
        this.name = model.name
        this.description = model.description
        this.brand = model.brand
        this.image = model.image
        this.price = model.price
        this.category = model.category
        this.menuCategory = model.menuCategory
        this.article = model.article
        this.stock = model.stock
	}
}
