import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import {
	getUserCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
	checkDiscount, 
	toggleProducts,
	createAnonimousCart,
	checkAnonimousCart,
	mergeUserCart,
} from "./cart.actions"
import { ICartItem } from "@/models/ICartItem"
import { areMultipleInArray } from "@/utils/Verify"
import { IDiscount } from "@/models/IDiscount"
import { IAnonimousCartResponse } from "../types"

interface IInitialState {
	isLoading: boolean
	isCartDataChanging: boolean
	items: Array<ICartItem>
	totalWithoutDiscount: number
	totalWithDiscount: number
	amountOfDiscount: number
	totalProductsCount: number
	selectedProducts: Array<ICartItem>
	discount: IDiscount | null
	isAllSelected: boolean
	anonimousCartId: string | null
	errors: { discount: string | null; cart: string | null }
}

const initialState: IInitialState = {
	isLoading: true,
	isCartDataChanging: false,
	items: [],
	selectedProducts: [],
	totalWithoutDiscount: 0,
	totalWithDiscount: 0,
	amountOfDiscount: 0,
	totalProductsCount: 0,
	isAllSelected: false,
	discount: null,
	anonimousCartId: null,
	errors: { discount: null, cart: null },
}

const checkIfAllSelected = (selectedProducts: ICartItem[], allItems: ICartItem[]) => {
	const selectedIds = selectedProducts?.map((el) => el.id)
	const allIds = allItems?.map((el) => el.id)
	return areMultipleInArray(allIds, selectedIds)
}

const calcValues = (items: Array<ICartItem>, discountPercent?: number | undefined ) => {

	const { totalCount, totalWithoutDicount } = items?.reduce((accumulator, product) => {
		accumulator.totalCount += product.count
		accumulator.totalWithoutDicount += product.price * product.count
		return accumulator
	}, {totalCount: 0, totalWithoutDicount: 0})

	let totalWithDiscount = totalWithoutDicount
	let amountOfDiscount = 0

	if (discountPercent) {
		totalWithDiscount = totalWithoutDicount - (totalWithDiscount * (discountPercent / 100))
		amountOfDiscount = totalWithoutDicount - totalWithDiscount
	}

	return { totalWithDiscount, totalWithoutDicount, amountOfDiscount, totalCount }
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		resetDiscount(state) {
			state.discount = initialState.discount 
			state.errors.discount = null

			const {
				totalWithDiscount,
				totalWithoutDicount,
				amountOfDiscount,
				totalCount,
			} = calcValues(state.selectedProducts)
			state.totalWithoutDiscount = totalWithoutDicount
			state.totalWithDiscount = totalWithDiscount
			state.amountOfDiscount = amountOfDiscount
			state.totalProductsCount = totalCount
		},

		setAnonimousCart(state, action) {
			state.anonimousCartId = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(
			getUserCart.fulfilled,
			(state, action: PayloadAction<Array<ICartItem>>) => {
				state.items = action.payload

				state.selectedProducts = action.payload?.filter(
					(el: ICartItem) => el.isSelected === true
				)

				state.isAllSelected = checkIfAllSelected(
					state.selectedProducts,
					state.items
				)

				const {
					totalWithDiscount,
					totalWithoutDicount,
					amountOfDiscount,
					totalCount,
				} = calcValues(state.selectedProducts, state.discount?.percent)
				state.totalWithoutDiscount = totalWithoutDicount
				state.totalWithDiscount = totalWithDiscount
				state.amountOfDiscount = amountOfDiscount
				state.totalProductsCount = totalCount

				state.isLoading = false
			}
		)

		builder.addCase(checkAnonimousCart.fulfilled, (state, action) => {
			state.anonimousCartId = action.payload?.userId
		})

		builder.addCase(getUserCart.rejected, (state, action) => {
			state.errors.cart = action.payload as string

			state.items = []
			state.isLoading = false
		})


		builder.addCase(checkDiscount.rejected, (state, action) => {
			state.errors.discount = action.payload as string

			state.discount = null

			const {
				totalWithDiscount,
				totalWithoutDicount,
				amountOfDiscount,
				totalCount,
			} = calcValues(state.selectedProducts)
			state.totalWithoutDiscount = totalWithoutDicount
			state.totalWithDiscount = totalWithDiscount
			state.amountOfDiscount = amountOfDiscount
			state.totalProductsCount = totalCount

			state.isCartDataChanging = false
		})

		builder.addCase(getUserCart.pending, (state, action) => {
			state.isLoading = true
		})

		builder.addMatcher(
			isAnyOf(checkDiscount.fulfilled),
			// добавление функционала для проверки существования аккаунта 
			// если аккаунта нет - дисконт не доступен, - необходимо авторизоваться
			(state, action) => {
				if (!action.payload) state.discount = null
				else state.discount = action.payload

				const {
					totalWithDiscount,
					totalWithoutDicount,
					amountOfDiscount,
					totalCount,
				} = calcValues(state.selectedProducts, state.discount?.percent)

				state.totalWithoutDiscount = totalWithoutDicount
				state.totalWithDiscount = totalWithDiscount
				state.amountOfDiscount = amountOfDiscount
				state.totalProductsCount = totalCount
				state.errors.discount = null
				
				state.isCartDataChanging = false
			}
		)

		builder.addMatcher(
			isAnyOf(
				incrementQuantity.pending,
				decrementQuantity.pending,
				removeFromCart.pending,
				checkDiscount.pending,
			),
			(state, _) => {
				state.isCartDataChanging = true
			}
		)
		builder.addMatcher(
			isAnyOf(
				incrementQuantity.fulfilled,
				decrementQuantity.fulfilled,
				removeFromCart.fulfilled,
				toggleProducts.fulfilled,
			),
			(state, action: PayloadAction<any>) => {
				state.items = action.payload
				state.selectedProducts = action.payload?.filter(
					(el: ICartItem) => el.isSelected === true
				)

				state.isAllSelected = checkIfAllSelected(
					state.selectedProducts,
					state.items
				)

				const {
					totalWithDiscount,
					totalWithoutDicount,
					amountOfDiscount,
					totalCount,
				} = calcValues(state.selectedProducts, state.discount?.percent)

				state.totalWithoutDiscount = totalWithoutDicount
				state.totalWithDiscount = totalWithDiscount
				state.amountOfDiscount = amountOfDiscount
				state.totalProductsCount = totalCount

				// state.isLoading = false
				state.isCartDataChanging = false
			}
		)
	},
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer




