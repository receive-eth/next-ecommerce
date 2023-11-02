'use client'

import Link from 'next/link'
import SingleCarousel from '@/shared/Carousels/SingleCarousel/SingleCarousel'
import styles from './ProductPopup.module.css'
import { sizeTypes } from '@/data'
import SizeChoice from '@/components/size-choice/SizeChoice'
import { useState } from 'react'
import AddToFavorites from "@/components/product-page-fragments/AddToFavorites/AddToFavorites"

import ControlledButton from '@/shared/Buttons/ControledButton'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { ICartItem } from '@/models/ICartItem'
import { ClosePopup } from '@/components/SVGS'
import { useCart } from '@/hooks/useCart'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import FavoritesIndicator from '@/shared/Buttons/FavoritesIndicator/FavoritesIndicator'

interface IProductPopup {
	isShown: boolean
	setShown: (newState: boolean) => void
	productData: ICartItem
}

const ProductPopup = ({
	isShown,
	setShown,
	productData: {
		productId,
		name,
		size,
		allSizes,
		color,
		brand,
		count,
		price,
		category,
		menuCategory,
		article,
		images,
		avaliableSizeCount,
		slug,
		description,
	},
}: IProductPopup) => {
	const [currentSizeId, setCurrentSizeId] = useState(size.sizeId)

	const handleClosePopup = () => {
		setShown(false)
		unlockScroll()
	}

	const [outsideRef] = useClickOutside(() => handleClosePopup())
	const [_, unlockScroll] = useBodyScrollLock()


	const { addToCart } = useActions()
	const { anonimousCartId } = useCart()
	const { user } = useAuth()

	return (
		<>
			{isShown && (
				<div className={styles.wrapper}>
					<div className={styles.popup_content} ref={outsideRef}>
						<button
							className={styles.close_popup_btn}
							onClick={() => handleClosePopup()}
						>
							<ClosePopup className={styles.close_icon} />
						</button>
						<div className={styles.left_side}>
							<div className={styles.carousel_wrapper}>
								<SingleCarousel imageURLS={images} />
							</div>
							<Link
								href={`/${menuCategory.toLowerCase()}/${slug}`}
								className={styles.more_info}
								onClick={() => handleClosePopup()}
							>
								More info
							</Link>
						</div>
						<div className={styles.right_side}>
							<div className={styles.right_info}>
								<span className={styles.name}>{name}</span>
								<span className={styles.brand}>{brand}</span>
								<span className={styles.price}>{price} €</span>
							</div>
							<div className={styles.discounts}>
								<div>
									<span>Titolo discount</span>
									<span className={styles.dicount_shop}>- 11 €</span>
								</div>
								<div>
									<span>Promocode</span>
									<span className={styles.dicount_promo}>- 5 €</span>
								</div>
								<div>
									<span>You save</span>
									<span>16 €</span>
								</div>
							</div>
							<div className={styles.right_menu}>
								<SizeChoice
									currentSizeId={currentSizeId}
									setCurrentSizeId={setCurrentSizeId}
									sizeTypes={sizeTypes}
									sizeList={allSizes}
									className={styles.size_choice_options}
								/>
								<div className={styles.menu_item_wrapper}>
									<ControlledButton
										title="Add to cart"
										className={styles.add_to_cart_btn}
										onClick={() => {
											addToCart({
												userId: user?.id || anonimousCartId,
												productId: productId,
												sizeId: currentSizeId || "",
											})
											unlockScroll()
										}
										}
									/>
									<AddToFavorites
										productId={productId}
										borderRadius="5px"
									/>
								</div>
							</div>

							<div className={styles.description_block}>
								<span className={styles.desc_title}>About product</span>
								<div className={styles.desc_details}>
									<p>
										<span>Color</span>
										<span>{color}</span>
									</p>
									<p>
										<span>Article</span>
										<span>{article || "AD1Z498"}</span>
									</p>
								</div>
								<p className={styles.desc_text}>{description}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ProductPopup