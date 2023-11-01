'use client'

import styles from './List.module.css'
import { useCart } from "@/hooks/useCart"
import { ICartItem } from '@/models/ICartItem'
import ListItem from '../ListItem/ListItem'
import CartItemsLoader from '@/components/preloaders/CartItemsLoader/CartItemsLoader'

const List = ({ groupedItems }: { groupedItems: Array<ICartItem> }) => {
	const { isLoading, isCartDataChanging } = useCart()

	const checkWhetherLast = (index: number) => {
		if (groupedItems.length - 1 !== index && groupedItems.length > 1) {
			return styles.list_element_underlined
		}

		return styles.list_element
	}

	return (
		<div className={styles.wrapper}>
			{isCartDataChanging && <CartItemsLoader />}
			<span className={styles.list_title}>{groupedItems[0].category}</span>

			<ul className={styles.list}>
				{groupedItems?.map((el: ICartItem, index: number) => (
					<ListItem
						key={`${el.id + Math.random()}`}
						productData={el}
						dynamicClasses={() => checkWhetherLast(index)}
					/>
				))}
			</ul>
		</div>
	)
}
export default List