'use client'

import styles from './Total.module.css'
import { useState } from "react"
import Discount from '../Discount/Discount'
import { useCart } from '@/hooks/useCart'
import ControlledButton from '@/shared/Buttons/ControledButton'

const Total = () => {

    const [isDropdownActive, setDropdownActive] = useState<boolean>(false)
	const { selectedProducts, totalWithDiscount, isLoading, totalProductsCount } = useCart()

    return (
			<div className={styles.calc_total}>
				<div className={styles.total_price}>
					<span>Total</span>
					<span>{totalWithDiscount} €</span>
				</div>
				<span className={styles.calc_subtitle}>
					Excluding possible shipping costs
				</span>
				<ControlledButton
					title={`Go to checkout`}
					subTitle={`${totalProductsCount} products`}
					disabled={!isLoading && selectedProducts.length === 0}
					disabledTitle={`Choose products to continue`}
					isContentLoading={isLoading}
					className={styles.checkout_btn}
				/>
				<Discount isDropped={isDropdownActive} setDropped={setDropdownActive} />
			</div>
		)
}

export default Total