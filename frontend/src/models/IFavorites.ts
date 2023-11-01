// import { IProduct } from "@/app/admin/types"
import { ISize } from "./ISize"
export interface IFavorites {
    id: string
    product: IProduct[]
}


export interface IProduct {
	productId: string
	name: string
	description: string
	brand: string
	color: string
	images: string[]
	price: number
	size: ISize[]
	category: string
	menuCategory: string
	article: string
	slug: string
}
