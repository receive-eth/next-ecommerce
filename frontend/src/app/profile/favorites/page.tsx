'use client'

import styles from "./page.module.css"
import DefaultProduct from "@/shared/Product/Default/DefaultListItem"
import { useFavorites } from "@/hooks/useFavorites"
import ContentLoader from "@/components/preloaders/ContentLoader/ContentLoader"

export default function Favorites() {

	const { products, isLoading, isFavoritesDataChanging } = useFavorites()
	
	if (isLoading) return <ContentLoader />

	return (
		<div className={styles.container}>
			<div className={styles.page_title}>My Favorites</div>
			{products?.length === 0 ? (
				<div className={styles.products_text_instead}>
					You have no favorite products.
				</div>
			) : (
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
							category={item.menuCategory.toLowerCase()}
							settings={{
								showBrand: true,
								showPrice: true,
								withMenu: true,
								isNameWrappedWithLink: true,
								withUnderlineOnProductHover: true,
							}}
						/>
					))}
				</div>
			)}
		</div>
	)
}
