'use client'

import styles from './page.module.css'
import GroupedLists from '@/components/cart-fragments/GroupedList'
import CartHeader from '@/components/cart-fragments/Header/CartHeader'
import OrderAmount from '@/components/cart-fragments/OrderAmount/OrderAmount'
import Total from '@/components/cart-fragments/Total/Total'
import { useAuth } from "@/hooks/useAuth"
import { useCart } from '@/hooks/useCart'
import { useActions } from '@/hooks/useActions'
import { useEffect } from 'react'
import CartNotFound from '@/components/cart-fragments/CartNotFound/CartNotFound'
import ContentLoader from '@/components/preloaders/ContentLoader/ContentLoader'
import CartItemsLoader from "@/components/preloaders/CartItemsLoader/CartItemsLoader"

export default function Cart() {
	const { user } = useAuth()
	const { getUserCart } = useActions()
	const { isLoading, items, anonimousCartId, errors } = useCart()

	useEffect(() => {
		getUserCart(user?.id || anonimousCartId)
	}, [])

	if (isLoading) return <ContentLoader />
	if (items.length === 0) return <CartNotFound />


	return (
		<div className={styles.wrapper}>
			<div className={styles.left_block}>
				<CartHeader />
				<GroupedLists />
			</div>
			<div className={styles.right_block}>
				<OrderAmount />
				<Total />
			</div>
		</div>
	)
}