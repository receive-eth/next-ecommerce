'use client'

import styles from './DefaultListItem.module.css'
import Link from 'next/link'
import Image from 'next/image'
import FavoritesIndicator from '@/shared/Buttons/FavoritesIndicator/FavoritesIndicator'
import SizeChoice from '@/components/size-choice/SizeChoice'
import ControlledButton from '@/shared/Buttons/ControledButton'

import { sizeTypes, sizePlaceholder } from "@/data"
import { useRef, useState } from "react"
import { useFavorites } from '@/hooks/useFavorites'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { ISize } from '@/models/ISize'
import { checkWhetherInFavorites } from '@/utils/checkWhetherInFavorites'
import { useCart } from '@/hooks/useCart'

interface IDefaultProduct {
	productId: string
	name: string
	brand: string
	color: string
	price: number
	images: string[]
	slug: string
	category: string
	size: ISize[]
	settings: {
		showBrand?: boolean
		showColor?: boolean
		showPrice?: boolean
		withMenu?: boolean
		withUnderlineOnProductHover?: boolean
		isNameWrappedWithLink?: boolean
	}
}

const DefaultProduct = ({
	productId,
	name,
	brand,
	color,
	size,
	price,
	images,
	slug,
	category,
	settings,
}: IDefaultProduct) => {
	const [isHovering, setHovering] = useState(false)
	const [currentSizeId, setCurrentSizeId] = useState<string | null>(null)

	const imgRef = useRef<HTMLImageElement | null>(null)
	const productCardRef = useRef<HTMLDivElement>(null)

	const { products, isLoading } = useFavorites()
	const { user } = useAuth()
	const { anonimousCartId } = useCart()
	const { addToFavorites, removeFromFavorites, addToCart } = useActions()

	const handleHover = (opacity: string) => {
		imgRef.current!.style.opacity = opacity
		setHovering(!isHovering)
	}

	const handleClick = () => {
		if (!user) return

		if (!checkWhetherInFavorites({ user, isLoading, products, productId }))
			return addToFavorites({ userId: user.id, productId: productId })

		return removeFromFavorites({ userId: user.id, productId: productId })
	}

	// if (isLoading) return <div>Loading</div>

	const isInFavorites = checkWhetherInFavorites({ user, isLoading, products, productId })

	return (
		<div
			className={`${styles.product}`}
			ref={productCardRef}
			onMouseEnter={() => handleHover("0")}
			onMouseLeave={() => handleHover("1")}
		>
			<div className={styles.images_container}>
				<Image
					src={images[1]}
					alt={""}
					className={styles.product_image}
					width={500}
					height={500}
				/>
				<Image
					ref={imgRef}
					src={images[0]}
					alt={""}
					className={styles.product_image}
					width={500}
					height={500}
				/>
				<div className={styles.indicator_wrapper}>
					<FavoritesIndicator
						isShowing={isHovering}
						isInFavorites={isInFavorites}
						onClick={handleClick}
					/>
				</div>
			</div>
			<div className={styles.product_info}>
				{settings?.isNameWrappedWithLink ? (
					<Link href={`/${category}/${slug}`}>
						<span
							className={
								settings?.withUnderlineOnProductHover
									? styles.product_name
									: styles.product_name_no_hover
							}
						>
							{name}
						</span>
					</Link>
				) : (
					<span
						className={
							settings?.withUnderlineOnProductHover
								? styles.product_name
								: styles.product_name_no_hover
						}
					>
						{name}
					</span>
				)}
				{settings?.showBrand && (
					<span className={styles.product_brand}>{brand}</span>
				)}
				{settings?.showColor && (
					<span className={styles.product_brand}>{color}</span>
				)}
				{settings?.showPrice && (
					<div className={styles.product_price}>€{price}</div>
				)}
			</div>
			{settings?.withMenu && (
				<div className={styles.product_menu}>
					<SizeChoice
						currentSizeId={currentSizeId}
						setCurrentSizeId={setCurrentSizeId}
						sizeTypes={sizeTypes}
						sizeList={size}
						height={"40px"}
						className={styles.size_choice}
					/>
					<ControlledButton
						className={styles.override_btn}
						title="Add to cart"
						disabled={isLoading}
						onClick={() =>
							addToCart({
								userId: user?.id || anonimousCartId,
								productId: productId,
								sizeId: currentSizeId || "",
							})
						}
					/>
				</div>
			)}
		</div>
	)
}


export default DefaultProduct


