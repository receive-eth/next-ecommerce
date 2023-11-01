import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IProduct } from "@/models/IProduct";
import { getUserFavorites, addToFavorites, removeFromFavorites } from "./favorites.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { IFavorites } from "@/models/IFavorites";

interface IInitialState {
	isLoading: boolean
	products: IProduct[]
	errors: {}
}

const initialState: IInitialState = {
	products: [],
	isLoading: false,
	errors: {},
}

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				isAnyOf(
					getUserFavorites.fulfilled,
					addToFavorites.fulfilled,
					removeFromFavorites.fulfilled
				),
				(state, action: PayloadAction<IFavorites>) => {
					state.products = action.payload?.product
					state.isLoading = false
				}
			)
			.addMatcher(
				isAnyOf(
					getUserFavorites.pending,
					addToFavorites.pending,
					removeFromFavorites.pending
				),
				(state) => {
					state.isLoading = true
				}
			)
	},
})


export default favoritesSlice.reducer