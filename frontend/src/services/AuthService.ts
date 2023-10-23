import $api from "@/http";
import { AuthResponse } from "@/models/response/AuthResponse";
import axios, { AxiosResponse } from "axios";

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {

		return $api.post("/user/login", { email, password })
	}

	static async registration(
		firstName: string,
		lastName: string,
		gender: string,
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post("/user/registration", {
			firstName,
			lastName,
			gender,
			email,
			password,
		})
	}

	static async logout(): Promise<void> {
		return $api.post("/user/logout")
	}

	static async getRefreshedTokenPair() {
		return await axios.get(`${process.env.API_URL}/user/refresh`, {
			withCredentials: true,
		})
	}
}