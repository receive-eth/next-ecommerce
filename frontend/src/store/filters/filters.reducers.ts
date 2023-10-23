import { createSlice } from "@reduxjs/toolkit";

type IInitialState = {
	brands: Array<string> | undefined
	colors: Array<string> | undefined
	minPrice: string | undefined
	maxPrice: string | undefined
	minVal: any
	maxVal: any
	sortby: string | undefined
}

const initialState: IInitialState = {
	brands: undefined,
	colors: undefined,
	minPrice: undefined,
	maxPrice: undefined,
	minVal: undefined,
	maxVal: undefined,
	sortby: undefined,
}

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setBrands(state, action) {
			state.brands = action.payload
		},
		setColors(state, action) {
			state.colors = action.payload
		},
		setSort(state, action) {
			state.sortby = action.payload
		},
		setMinPrice(state, action) {
			state.minPrice = action.payload
		},
		setMaxPrice(state, action) {
			state.maxPrice = action.payload
		},
		setFilters(state, { payload }) {
			state.brands = payload.brands
			state.colors = payload.colors
			state.sortby = payload.sortby
			state.minPrice = payload.minPrice
			state.maxPrice = payload.maxPrice
		},
	},
})

export const filterActions = filterSlice.actions
export default filterSlice.reducer