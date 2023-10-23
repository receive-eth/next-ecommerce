import axios from "axios";
import { revalidatePath } from "next/cache";

export default class ProductService {
	static async getAllProductsPaginated(
		numberOfPage: string | string[] | 1,
		menuCategory: string,
		brand: any,
		color: any,
		sortby: any,
		minPrice: any,
		maxPrice: any
	) {
		const link = `http://localhost:5001/api/products/paginated?page=${numberOfPage}&category=${menuCategory}${
			brand.length !== 0 ? brand.map((el: any) => `&brand=${el}`).join("") : ``
		}${
			color.length !== 0 ? color.map((el: any) => `&color=${el}`).join("") : ``
		}${
			sortby !== undefined
				? `&sortby=` +
				  sortby
						.split("-")
						.map((el: string) => {
							return `${el.replace(" ", "").replace(/ /gi, "-").toLowerCase()}`
						})
						.join(",")
				: ``
		}
		${
			minPrice !== undefined && maxPrice !== undefined
				? `&price=${minPrice}-${maxPrice}`
				: ``
		}`
		return axios.get(link).then((res) => res.data)
	}

	static getAvailableFilterPositions(query: string) {
		
		return axios
			.get(`http://localhost:5001/api/products/filter-positions?${query}`)
			.then((res) => res.data)
	}

	static getDefaultPrices() {
		return axios.get('').then((res) => res.data)
	}

	handleSort = (queryPrefix: string, string: string) => {
		const newString = string
			.split("-")
			.map((el: string) =>
				el.replace(" ", "").replace(/ /gi, "-").toLowerCase()
			)
			.join(",")
		return `${queryPrefix}${newString}`
	}

	static async getProductByArticle(article: string) {
		return axios
			.get(`http://localhost:5001/api/products/${article}`)
			.then((res) => res.data)
	}

	static getProductByName(name: string) {
		return axios
			.get(`http://localhost:5001/api/products/${name}`)
			.then((res) => res.data)
	}

	static getProductBySlug(slug: string) {
		return axios
			.get(`http://localhost:5001/api/products/by-slug/${slug}`)
			.then((res) => res.data)
	}

	static getProductsByMenuCategory(menuCategory: string) {
		return axios
			.get(
				`http://localhost:5001/api/products/by-menu-category/${menuCategory}`
			)
			.then((res) => res.data)
	}

	static deleteProduct(article: string) {
		axios
			.delete(`http://localhost:5001/api/products/delete`, {
				data: {
					article,
				},
			})
			.then((res) => {
				revalidatePath(`/[products]/[product_slug]`)
				return res.data
			})
	}
}