import axios from "axios";

export default class FavoritesService {
	static async getUserFavorites(userId: string) {
		const result = await axios.get(
			`http://localhost:5001/api/favorites/get-user-favorites/${userId}`
		)

		return result.data
	}

	static async addToFavorites(userId: string, productId: string) {
		const result = await axios.post(`http://localhost:5001/api/favorites/add`, {
			userId,
			productId,
		})
		await new Promise((resolve) => setTimeout(resolve, 200))
		return result.data
	}

	static async removeFromFavorites(userId: string, productId: string) {
		const result = await axios.delete(
			`http://localhost:5001/api/favorites/remove`,
			{
				data: { userId, productId },
			}
		)
		await new Promise((resolve) => setTimeout(resolve, 200))
		return result.data
	}
}

