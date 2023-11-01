import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice from './user/user.reducers'
import favoritesSlice from "./favorites/favorites.reducers"

import * as userActions from "./user/user.actions"
import * as cartThunks from "./cart/cart.actions"
import * as favoritesService from "./favorites/favorites.actions"
import filterSlice from "./filters/filters.reducers"
import { filterActions } from "./filters/filters.reducers"
import cartSlice from './cart/cart.reducers'
import { cartActions } from "./cart/cart.reducers"

const rootReducer = combineReducers({
	user: userSlice,
	filters: filterSlice,
	cart: cartSlice,
	favorites: favoritesSlice,
})


export const rootActions = {
	...userActions,
	...filterActions,
	...cartActions,
	...cartThunks,
	...favoritesService,
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})



export type TypeRootState = ReturnType<typeof store.getState>