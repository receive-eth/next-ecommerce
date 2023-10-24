'use client'

import styles from './DefaultListItem.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import FavoritesIndicator from '@/shared/Buttons/FavoritesIndicator/FavoritesIndicator'
import { useRouter } from 'next/navigation'
import CartItemsLoader from '@/components/preloaders/CartItemsLoader/CartItemsLoader'

interface IDefaultProduct {
    name: string
    brand: string
    color: string
    price: number
    images: string[]
    slug: string
    category: string
}

const DefaultProduct = ({ name, brand, color, price, images, slug, category }: IDefaultProduct) => {

	const [isHovering, setHovering] = useState(false)

    const imgRef = useRef<HTMLImageElement | null>(null)
	const productCardRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

    const handleHover = (opacity: string) => {
			imgRef.current!.style.opacity = opacity
			setHovering(!isHovering)
		}

	return (
		<div
			className={styles.product}
			ref={productCardRef}
			onMouseEnter={() => handleHover("0")}
			onMouseLeave={() => handleHover("1")}
		>
			<a
				onClick={() => router.push(`/${category}/${slug}`)}
				// для предотвращения поведения NextTopLoader
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
							isInFavorites={false}
							onClick={() => {}}
						/>
					</div>
				</div>

				<div className={styles.product_info}>
					<span className={styles.product_name}>{name}</span>
					<span className={styles.product_brand}>{brand}</span>
					<span className={styles.product_brand}>{color}</span>
					<div className={styles.product_price}>€{price}</div>
				</div>
			</a>
		</div>
	)
}


export default DefaultProduct


