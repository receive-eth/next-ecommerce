import AuthService from "@/services/AuthService"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginCredentials, registrationCredentials } from "../types"

export const login = createAsyncThunk(
	"login",
	async (credentials: loginCredentials, thunkApi) => {
		try {
			const response = await AuthService.login(
				credentials.email,
				credentials.password
			)
			localStorage.setItem("accessToken", response.data.accessToken)
			console.log("USER: ", response.data.user)
			return response
		} catch (e) {
			thunkApi.rejectWithValue(e)
		}
	}
)

export const registration = createAsyncThunk(
	"registration",
	async (credentials: registrationCredentials, thunkApi) => {
		try {
		const response = await AuthService.registration(
			credentials.firstName,
			credentials.lastName,
			credentials.gender,
			credentials.email,
			credentials.password
		)
		localStorage.setItem("accessToken", response.data.accessToken)
		return response
		} catch (e) {
			console.log(e)
			thunkApi.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk(
    'logout',
    async (_, thunkApi) => {
        try {
			await AuthService.logout()
			localStorage.removeItem("accessToken")
        } catch(e) {
			thunkApi.rejectWithValue(e)
        }
    }
)

export const checkAuth = createAsyncThunk(
	'auth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getRefreshedTokenPair()
			localStorage.setItem("accessToken", response?.data?.accessToken)

			return response
		} catch(e) {
			thunkApi.rejectWithValue(e)
		}
	}
)

 