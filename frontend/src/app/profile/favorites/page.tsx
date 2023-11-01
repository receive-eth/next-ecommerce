'use client'

import styles from "./page.module.css"
import DefaultProduct from "@/shared/Product/Default/DefaultListItem"
import { useFavorites } from "@/hooks/useFavorites"
import { useEffect } from "react"

export default function Favorites() {

	const { products, isLoading } = useFavorites()
	
	// if (isLoading) return <ContentLoader />

	useEffect(() => {
		console.log('products: ', products)
	}, [products])

	
	return (
		<div className={styles.container}>
			<div className={styles.page_title}>My Favorites</div>

			<div className={styles.products_wrapper}>
				{products?.map((item, index) => (
					<DefaultProduct
						key={index}
						productId={item.productId}
						name={item.name}
						brand={item.brand}
						color={item.color}
						size={item.size}
						price={item.price}
						images={item.images}
						slug={item.slug}
						category={item.category}
						settings={{
							showBrand: true,
							showPrice: true,
							withMenu: true,
							isNameWrappedWithLink: true,
						}}
					/>
				))}
			</div>
		</div>
	)
}
