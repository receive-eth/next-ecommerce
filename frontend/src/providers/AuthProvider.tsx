"use client"

import ContentLoader from "@/components/preloaders/ContentLoader/ContentLoader"
import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useCart } from "@/hooks/useCart"
import { useFavorites } from "@/hooks/useFavorites"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { checkAuth, checkAnonimousCart } = useActions()
	const { isLoading: isUserLoading, user } = useAuth()
	const { anonimousCartId } = useCart()
	const { mergeUserCart, getUserFavorites } = useActions()

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
			getUserFavorites(user?.id)
		}
	}, [user])

	if (isUserLoading) return <ContentLoader />
	if (!user && !anonimousCartId) return <ContentLoader />

	return <>{children}</>
}


export default AuthProvider
