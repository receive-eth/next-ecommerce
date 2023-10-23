'use client'

import styles from './CartHeader.module.css'
import CustomCheckbox from '@/shared/Checkbox/CustomCheckbox'
import { useCart } from '@/hooks/useCart'
import { useActions } from '@/hooks/useActions'
import { Trash } from '@/components/SVGS'
import { useAuth } from '@/hooks/useAuth'
import { ICartItem } from '@/models/ICartItem'

const CartHeader = () => {

	const { toggleProducts, removeFromCart } = useActions()
    const { isAllSelected, items, totalProductsCount, selectedProducts } = useCart()
	const { user } = useAuth()

	const handleRemoveFromCart = () => {
		removeFromCart({ 
			userId: user.id, 
			productIds: selectedProducts.map((el) => el.productId)
		})
	}

	const calcSelectedProdCount = (selectedProducts: Array<ICartItem>) => {
		return selectedProducts.reduce((total, product) => {
			return total + product.count
		}, 0)
	}

    return (
			<div className={styles.header}>
				<div className={styles.main_header_block}>
					<div className={styles.main_header_title}>
						<span className={styles.cart_title}>Cart</span>
						<span className={styles.items_count}>
							{totalProductsCount} items
						</span>
					</div>
					<div className={styles.header_menu}>
						<CustomCheckbox
							checkCondition={isAllSelected}
							onChange={() => {
								console.log({
									userId: user.id,
									cartItemIds: items.map((el) => el.id),
									isSelected: !isAllSelected,
								})
								toggleProducts({
									userId: user.id,
									cartItemIds: items.map((el) => el.id),
									isSelected: !isAllSelected,
								})
							}}
							labelText="Select all"
						/>
						<label
							onClick={handleRemoveFromCart}
							className={styles.delete_icon_btn}
						>
							<Trash width={25} height={25} />
							<span>Delete</span>
							<span>({calcSelectedProdCount(selectedProducts)})</span>
						</label>
					</div>
				</div>
				<div className={styles.separator} />
			</div>
		)
}

export default CartHeader