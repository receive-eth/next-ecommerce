'use client'

import styles from './OrderAmount.module.css'
import { useCart } from '@/hooks/useCart'

const OrderAmount = () => {

	const {totalWithoutDiscount, amountOfDiscount, selectedProducts, totalProductsCount } =
		useCart()


    return (
			<div className={styles.order_details}>
				<div className={styles.calc_title}>Order amount</div>
				{selectedProducts.length > 0 && (
					<div className={styles.calc_info}>
						<div>
							<span>{totalProductsCount} items</span>
							<span>{totalWithoutDiscount}€</span>
						</div>
						<div>
							<span>Your discount: </span>
							<span
								style={
									amountOfDiscount !== 0 ? { color: "#f93b00" } : undefined
								}
							>
								{amountOfDiscount !== 0
									? `- ${amountOfDiscount} €`
									: `${amountOfDiscount} €`}
							</span>
						</div>
					</div>
				)}
			</div>
		)
}

export default OrderAmount