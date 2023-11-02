import { createAsyncThunk } from "@reduxjs/toolkit"
import CartService from "@/services/CartService"

import {
	IUserCart,
	IRemCart,
	IChangeQuantity,
	IToggle,
	IDiscountRequest,
	ICustomError,
	ApiError,
	IMergingCart,
} from "../types"
import axios, { AxiosError, AxiosResponse } from "axios"
import { IDiscount } from "@/models/IDiscount"

export const getUserCart = createAsyncThunk(
	"cart/getUserCart",
	async (userId: string, thunkApi) => {
		try {
			if (userId) {
				const result = await CartService.getUserCart(userId)
				
				return result
			}
			console.log('THE VALUE OF userId: ', userId)
			// в крайнем случае - пустой массив возвращать
		} catch (e: unknown) {
			if (axios.isAxiosError<ApiError>(e)) {
				return thunkApi.rejectWithValue(e.response?.data.message)
			}
		}
	}
)


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (userCart: IUserCart, thunkApi) => {
        try {
			if (userCart.userId) {
				const result = await CartService.addToCart(
					userCart.userId,
					userCart.productId,
					userCart.sizeId,
					userCart.isAnonimous
				)
				return result
			}

			const anonimousCartId = localStorage.getItem("__anonimous_cart_id")
			
			return await CartService.addToCart(
				anonimousCartId || "",
				userCart.productId,
				userCart.sizeId,
				userCart.isAnonimous
			)

        } catch(e) {
            thunkApi.rejectWithValue(e)
        }
    }
)

export const removeFromCart = createAsyncThunk(
	"cart/removeFromCart",
	async (userCart: IRemCart, thunkApi) => {
		try {
			const result = await CartService.removeFromCart(
				userCart.userId,
				userCart.productIds
			)

			return result
		} catch (e) {
			thunkApi.rejectWithValue(e)
		}
	}
)

export const incrementQuantity = createAsyncThunk(
	"cart/incrementQuantity",
	async (userCart: IChangeQuantity, thunkApi) => {
		try {
			const result = await CartService.incrementQuantity(
				userCart.userId,
				userCart.productId
			)

			return result
		} catch (e) {
			thunkApi.rejectWithValue(e)
		}
	}
)

export const decrementQuantity = createAsyncThunk(
	"cart/decrementQuantity",
	async (userCart: IChangeQuantity, thunkApi) => {
		try {
			const result = await CartService.decrementQuantity(
				userCart.userId,
				userCart.productId
			)
			return result
		} catch (e) {
			thunkApi.rejectWithValue(e)
		}
	}
)


export const toggleProducts = createAsyncThunk(
	"cart/toggleProducts",
	async (data: IToggle, thunkApi) => {
		try {
			const result = await CartService.toggleProducts(
				data.userId,
				data.cartItemIds,
				data.isSelected
			)
			return result
		} catch(e) {
			thunkApi.rejectWithValue(e)
		}
	}
)

export const checkDiscount = createAsyncThunk(
	"cart/checkDiscount",
	async (discount: IDiscountRequest, thunkApi) => {
		try {
			const result: IDiscount = await CartService.checkDiscount(
				discount.userId,
				discount.promocode
			)

			return result
    } catch (e: unknown) {
		if (axios.isAxiosError<ApiError>(e)) {
			return thunkApi.rejectWithValue(e.response?.data.message)
		}
	}
})

export const createAnonimousCart = createAsyncThunk(
	"cart/createAnonimousCart",
	async (_, thunkApi) => {
		try {
			const result = await CartService.createAnonimousCart()
			return result
		} catch(e) {
			thunkApi.rejectWithValue(e)
		}
	}
)

export const checkAnonimousCart = createAsyncThunk(
	"cart/createAnonimousCart",
	async (anonimousCartId: string, thunkApi) => {
		try {
			const result = await CartService.checkAnonimousCart(anonimousCartId)
			if (result) localStorage.setItem("__anonimous_cart_id", result.userId)

			return result
		} catch (e) {
			thunkApi.rejectWithValue(e)
		}
	}
)

export const mergeUserCart = createAsyncThunk(
	"cart/mergeUserCart",
	async (mergingCart: IMergingCart, thunkApi) => {
		try {
			const result = await CartService.mergeUserCart({
				anonimousCartId: mergingCart.anonimousCartId,
				loggedInUserId: mergingCart.loggedInUserId
			})
			console.log('merged')
			return result
		} catch(e) {
			thunkApi.rejectWithValue(e)
		}
	}
)




