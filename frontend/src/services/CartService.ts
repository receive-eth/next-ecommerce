import { IAnonimousCartResponse, IMergingCart } from "@/store/types"
import axios, { AxiosResponse } from "axios"

export default class CartService {
	static async getUserCart(userId: string) {
		if (userId) {

			const result = await axios
				.get(`http://localhost:5001/api/cart/find/${userId}`)
				.then((res) => res.data)

			return result
		}
	}

	static async addToCart(
		userId: string,
		productId: string,
		sizeId: string,
		isAnonimous?: boolean
	) {
		const result = await axios
			.post(`http://localhost:5001/api/cart/seed`, {
				userId,
				productId,
				sizeId,
				isAnonimous,
			})
			.then((res) => res.data)
		console.log(result)
		return result
	}

	static async removeFromCart(userId: string, productIds: string[]) {
		const response = await axios.delete(
			`http://localhost:5001/api/cart/remove`,
			{
				data: {
					userId,
					productIds,
				},
			}
		)

		if (response.status === 200) {
			await new Promise((resolve) => setTimeout(resolve, 200))
			return await this.getUserCart(userId)
		}
	}

	static async incrementQuantity(userId: string, productId: string) {
		const result = await axios
			.put(`http://localhost:5001/api/cart/increment`, {
				userId,
				productId,
			})
			.then((res) => res.data)

		await new Promise((resolve) => setTimeout(resolve, 200))
		return result
	}

	static async decrementQuantity(userId: string, productId: string) {
		const result = await axios
			.put(`http://localhost:5001/api/cart/decrement`, {
				userId,
				productId,
			})
			.then((res) => res.data)

		await new Promise((resolve) => setTimeout(resolve, 200))
		return result
	}

	static async toggleProducts(
		userId: string,
		cartItemIds: string[],
		isSelected: boolean
	) {
		const result = await axios
			.put(`http://localhost:5001/api/cart/toggle`, {
				userId,
				cartItemIds,
				isSelected,
			})
			.then((res) => res.data)

		return result
	}

	static async checkDiscount(userId: string, promocode: string) {
		const result = await axios
			.get(`http://localhost:5001/api/discount/check`, {
				params: { userId, promocode },
			})
			.then((res) => res.data)

		await new Promise((resolve) => setTimeout(resolve, 200))

		return result
	}

	static async createAnonimousCart() {
		const result = await axios.post(
			`http://localhost:5001/api/cart/create-anonimous`
		)
		.then((res) => res.data)

		localStorage.setItem("__anonimous_cart_id", result.userId)

		return result
	}

	static async checkAnonimousCart(anonimousCartId: string) {
		const result = await axios.get(
			`http://localhost:5001/api/cart/check-anonimous/${anonimousCartId}`
		).then((res) => res.data)

		console.log(anonimousCartId)
		console.log("result is: ", result)
		
		return result
	}

	static async mergeUserCart({anonimousCartId, loggedInUserId} : IMergingCart) {
		await axios.post(
			`http://localhost:5001/api/cart/merge-user-cart`,
			{
				anonimousCartId,
				loggedInUserId,
			}
		)
	}
}
