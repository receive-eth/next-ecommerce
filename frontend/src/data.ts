import { IProduct } from "./app/admin/types"

export const imageURLS = [
	"https://res.cloudinary.com/domfficw7/image/upload/v1696459185/products/article:3/order:1.jpg",
	"https://res.cloudinary.com/domfficw7/image/upload/v1696459187/products/article:3/order:2.jpg",
	"https://res.cloudinary.com/domfficw7/image/upload/v1696459188/products/article:3/order:3.jpg",
]


export const sizeTypes = ["sm", "eu", "uk", "us"]

export const sizePlaceholder = [
	{sizeId: '1', sm: "28", eu: "20", uk: "30", us: "10", stock: 100},
]

export const productPlaceholderInfo: IProduct = {
	name: "Adidas Handball Spezial",
	description:
		"Crocs clogs are made of lightweight polymer material - Croslite ™ . A fully cast model under the influence of body temperature takes the form of a foot. For maximum comfort, it is necessary to choose the right size - the border of the heel should coincide with the border of the massage lines on the insole of the clogs. Use cool water and soap when dirty. Do not expose shoes to high temperatures. ",
	color: "black",
	brand: "Adidas",
	images: imageURLS,
	price: 100,
	size: sizePlaceholder[0],
	category: "Sneakers",
	menuCategory: "Men",
	article: "",
	slug: "",
}