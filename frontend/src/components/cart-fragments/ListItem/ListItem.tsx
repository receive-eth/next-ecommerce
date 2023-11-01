'use client'

import Image from "next/image"
import CustomCheckbox from "@/shared/Checkbox/CustomCheckbox"
import Counter from "../Counter/Counter"
import styles from './ListItem.module.css'
import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"
import { Trash } from "@/components/SVGS"
import { useState } from "react"
import ProductPopup from "@/shared/Popups/ProductPopup/ProductPopup"
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock"
import { ICartItem } from "@/models/ICartItem"
import { useCart } from "@/hooks/useCart"
import DiscountBadge from "@/shared/Other/DiscountBadge/DiscountBadge"
import FavoritesIndicator from "@/shared/Buttons/FavoritesIndicator/FavoritesIndicator"
import { useFavorites } from "@/hooks/useFavorites"
import { checkWhetherInFavorites } from "@/utils/checkWhetherInFavorites"

interface IListItem {
	productData: ICartItem
	dynamicClasses: () => string
}

const ListItem = ({
	productData,
	dynamicClasses
}: IListItem) => {
	const { incrementQuantity, decrementQuantity, toggleProducts, removeFromCart, addToFavorites, removeFromFavorites } = useActions()
	const { user } = useAuth()
	const { amountOfDiscount, discount, anonimousCartId } = useCart()

	const [isMenuShowing, setMenuShowing] = useState<boolean>(false)
	const [isPopupShowing, setPopupShowing] = useState<boolean>(false)
	const [lockScroll, _] = useBodyScrollLock()

	const { isLoading, products } = useFavorites()
	const handleOpenPopup = () => {
		setPopupShowing(true)
		lockScroll()
	}

	const [isHovering, setHovering] = useState(false)

	const calculateDiscountedPrice = (initialPrice: number, count: number, percent: number | undefined) => {
		if (!percent) return initialPrice
		const fullPrice = initialPrice * count
		const discountAmount = (fullPrice * percent) / 100
		return fullPrice - discountAmount
	}

	const isInFavorites = checkWhetherInFavorites({
		user,
		isLoading,
		products,
		productId: productData.productId,
	})


	const handleClick = (productId: string) => {
		if (!user) return
		if (!isInFavorites)
			return addToFavorites({ userId: user.id, productId: productId })

		return removeFromFavorites({ userId: user.id, productId: productId })
	}

	return (
		<li
			className={dynamicClasses()}
			onMouseEnter={() => setMenuShowing(true)}
			onMouseLeave={() => setMenuShowing(false)}
		>
			<ProductPopup
				isShown={isPopupShowing}
				setShown={setPopupShowing}
				key={productData.id}
				productData={productData}
			/>
			<div className={styles.main_info}>
				<CustomCheckbox
					checkCondition={productData.isSelected}
					onChange={() =>
						toggleProducts({
							userId: user.id,
							cartItemIds: [productData.id],
							isSelected: !productData.isSelected,
						})
					}
				/>
				<Image
					src={productData.images[0]}
					width={110}
					height={100}
					alt="product image"
					style={{
						boxShadow: "0 0 0 1px #c4c4c4",
						height: "100%",
					}}
					onClick={() => handleOpenPopup()}
					className={styles.img}
				/>
				<div className={styles.product_info}>
					<div className={styles.main_info}>
						<span>{productData.name}</span>
						<div className={styles.size_info}>
							{productData.size.eu !== "" && (
								<span>({productData.size.eu} EU)</span>
							)}
							{productData.size.uk !== "" && (
								<span>({productData.size.uk} UK)</span>
							)}
							{productData.size.us !== "" && (
								<span>({productData.size.us} US)</span>
							)}
						</div>
						<span>{productData.color}</span>
					</div>
					<div className={styles.info_footer}>
						<Counter
							onPlusClick={() =>
								incrementQuantity({
									userId: user?.id || anonimousCartId,
									productId: productData.productId,
								})
							}
							onMinusClick={() =>
								decrementQuantity({
									userId: user?.id || anonimousCartId,
									productId: productData.productId,
								})
							}
							count={productData.count}
							disableMinus={productData.count === 1}
							disablePlus={productData.count >= productData.avaliableSizeCount}
						/>
						{isMenuShowing && (
							<div className={styles.item_control}>
								<label
									onMouseEnter={() => setHovering(true)}
									onMouseLeave={() => setHovering(false)}
								>
									<FavoritesIndicator
										isShowing={true}
										isInFavorites={isInFavorites}
										isGray={!isHovering}
										onClick={() => handleClick(productData.productId)}
									/>
									{isInFavorites ? (
										<span>In favorites</span>
									) : (
										<span>Add to favorites</span>
									)}
								</label>
								<label
									onClick={() =>
										removeFromCart({
											userId: user?.id || anonimousCartId,
											productIds: [productData.productId],
										})
									}
								>
									<Trash width={25} height={25} className={styles.icon_btn} />
									<span>Remove</span>
								</label>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className={styles.price}>
				{amountOfDiscount !== 0 ? (
					<>
						<span className={styles.discounted_price}>
							{productData.price * productData.count} €
						</span>
						<span
							className={
								amountOfDiscount !== 0 ? styles.price_with_discount : undefined
							}
						>
							{`${calculateDiscountedPrice(
								productData.price,
								productData.count,
								discount?.percent
							)} €`}
						</span>
						<DiscountBadge text={`-${discount?.percent}%`} />
					</>
				) : (
					<span
						className={
							amountOfDiscount !== 0 ? styles.price_with_discount : undefined
						}
					>
						{productData.price * productData.count} €
					</span>
				)}
			</div>
		</li>
	)
}

export default ListItem
