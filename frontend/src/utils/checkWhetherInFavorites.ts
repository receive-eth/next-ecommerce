import { IProduct } from "@/models/IProduct"
import { IUser } from "@/models/IUser"

interface ICheckWhetherInFavorites {
	user: IUser
	isLoading: boolean
	products: IProduct[]
	productId: string
}


export const checkWhetherInFavorites = ({ user, isLoading, products = [], productId }: ICheckWhetherInFavorites) => {
	if (!user) return false
	if (isLoading || products?.length === 0) return false

	for (let product of products) {
		if (product.productId === productId) return true
	}

	return false
}