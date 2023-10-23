"use client"
import { Provider } from "react-redux"
import { store } from "../store/store"
import NextTopLoader from "nextjs-toploader"

export default function RootProvider ({ children }: { children: React.ReactNode }) {
    return (
			<Provider store={store}>
				<NextTopLoader color="#818181" height={3} showSpinner={false} />
				{children}
			</Provider>
		)
}
