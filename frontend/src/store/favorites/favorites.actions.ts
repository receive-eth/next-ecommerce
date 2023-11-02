import { createAsyncThunk } from "@reduxjs/toolkit";
import FavoritesService from "@/services/FavoritesService";
import { IFavoritesRequest } from "../types";

export const getUserFavorites = createAsyncThunk(
    "favorites/getUserFavorites",
    async (userId: string, thunkApi) => {
        try {
            const response = await FavoritesService.getUserFavorites(userId)
            return response
        } catch(e) {
            thunkApi.rejectWithValue(e)
        }
    }
)

export const addToFavorites = createAsyncThunk(
	"favorites/addToFavorites",
	async ({ userId, productId }: IFavoritesRequest, thunkApi) => {
        try {
            const response = await FavoritesService.addToFavorites(userId, productId)
            return response
        } catch(e) {
            thunkApi.rejectWithValue(e)
        }
    }
)

export const removeFromFavorites = createAsyncThunk(
    "favorites/removeFromCart",
    async ({ userId, productId }: IFavoritesRequest, thunkApi) => {
        try {
            const response = await FavoritesService.removeFromFavorites(userId, productId)
            return response
        } catch(e) {
            thunkApi.rejectWithValue(e)
        }
    }
)