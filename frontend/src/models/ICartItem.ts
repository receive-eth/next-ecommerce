import { ISize } from "./ISize"

export interface ICartItem {
	id: string
	productId: string
	name: string
	images: string[]
	price: number
	size: ISize
	allSizes: Array<ISize>
	isSelected: boolean
	isInFavorites: boolean
	avaliableSizeCount: number
	count: number
	color: string
	brand: string
	category: string
	menuCategory: string
	article: number
	description: string
	slug: string
}