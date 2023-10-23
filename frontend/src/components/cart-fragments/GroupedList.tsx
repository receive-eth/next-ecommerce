'use client'
import List from './List/List'
import { useCart } from "@/hooks/useCart"
import { useEffect, useState } from 'react'
import { ICartItem } from '@/models/ICartItem'

interface ICartCards {
	apparel: Array<ICartItem>
	sneakers: Array<ICartItem>
	accessories: Array<ICartItem>
	other: Array<ICartItem>
}

const GroupedLists = () => {
	const { items } = useCart()

	const [cartCards, serCartCards] = useState<ICartCards>({
		apparel: [],
		sneakers: [],
		accessories: [],
		other: [],
	})

	useEffect(() => {
		if (items) {
			items.length === 0 && serCartCards({ apparel: [], sneakers: [], accessories: [], other: [] })

			let newApparel: Array<ICartItem> = [], newSneakers: Array<ICartItem> = []
			let newAccessories: Array<ICartItem> = [], newOther: Array<ICartItem> = []

			items?.forEach((item: ICartItem, index, array) => {
				switch (item.category) {
					case "Apparel":
						newApparel.push(item)
						break
					case "Sneakers":
						newSneakers.push(item)
						break
					case "Accessories":
						newAccessories.push(item)
					default:
						newOther.push(item)
						break
				}

				if (index === array.length - 1) {
					serCartCards({
						apparel: newApparel,
						sneakers: newSneakers,
						accessories: newAccessories,
						other: newOther,
					})
				}
			})
		}
	}, [items])


	return (
		<div>
			{cartCards.apparel.length !== 0 && <List groupedItems={cartCards.apparel} />}
			{cartCards.sneakers.length !== 0 && <List groupedItems={cartCards.sneakers} />}
			{cartCards.accessories.length !== 0 && <List groupedItems={cartCards.accessories} />}
			{cartCards.other.length !== 0 && <List groupedItems={cartCards.other} />}
		</div>
	)
}

export default GroupedLists
