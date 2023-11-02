import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IProduct } from "@/models/IProduct";
import { getUserFavorites, addToFavorites, removeFromFavorites } from "./favorites.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { IFavorites } from "@/models/IFavorites";

interface IInitialState {
	isLoading: boolean
	isFavoritesDataChanging: boolean, 
	products: IProduct[]
	errors: {}
}

const initialState: IInitialState = {
	products: [],
	isLoading: false,
	isFavoritesDataChanging: false,
	errors: {},
}

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserFavorites.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(getUserFavorites.fulfilled, (state, action) => {
				state.products = action.payload?.product
				state.isLoading = false
			})

			.addMatcher(
				isAnyOf(addToFavorites.pending, removeFromFavorites.pending),
				(state) => {
					state.isFavoritesDataChanging = true
				}
			)

			.addMatcher(
				isAnyOf(addToFavorites.fulfilled, removeFromFavorites.fulfilled),
				(state, action: PayloadAction<IFavorites>) => {
					state.products = action.payload?.product
					state.isFavoritesDataChanging = false
				}
			)
	},
})


export default favoritesSlice.reducer