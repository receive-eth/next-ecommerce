import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit"
import { login, logout, registration, checkAuth } from "./user.actions"
import { IIState } from "../types"

const initialState: IIState = {
	isLoading: false,
    error: null,
	user: null,
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
    extraReducers: builder => {
        builder
				.addCase(checkAuth.fulfilled, (state, action) => {
					state.user = action.payload?.data?.user
					state.isLoading = false
				})
				.addCase(login.fulfilled, (state, action) => {
					state.user = action.payload?.data?.user
					state.isLoading = false
				})
				.addCase(logout.fulfilled, (state, action) => {
					state.user = null
					state.isLoading = false
				})
				.addMatcher(
					isAnyOf(login.pending, registration.pending, checkAuth.pending),
					(state: any, action: PayloadAction<any>) => {
						state.isLoading = true
						state.user = null
					}
				)
    }
})

export default userSlice.reducer
