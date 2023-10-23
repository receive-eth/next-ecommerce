"use client"

import ContentLoader from "@/components/preloaders/ContentLoader/ContentLoader"
import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useCart } from "@/hooks/useCart"

const AuthProvider = ({ children }: any) => {
	const { checkAuth, checkAnonimousCart } = useActions()
	const { isLoading, user } = useAuth()
	const { anonimousCartId } = useCart()
	const { mergeUserCart } = useActions()

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken")
		const anonimousCartId = localStorage.getItem("__anonimous_cart_id")
		if (accessToken) checkAuth()

		if (!accessToken) {
			checkAnonimousCart(String(anonimousCartId))
		}
	}, [])

	useEffect(() => {
		if (user) {
			mergeUserCart({ anonimousCartId, loggedInUserId: user.id })
		}
	}, [user])

	if (isLoading) return <ContentLoader />
	if (!user && !anonimousCartId) return <ContentLoader />

	return <>{children}</>
}


export default AuthProvider
