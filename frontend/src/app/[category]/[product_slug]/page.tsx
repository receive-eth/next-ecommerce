import Image from "next/image"
import styles from "./page.module.css"
import ProductService from "@/services/ProductService"
import Favorites from "@/components/SVGS/Favorites.svg"
import Link from "next/link"
import { notFound } from "next/navigation"
import SizeForm from "@/components/size-choice/Form"
import FavoritesIndicator from "@/shared/Buttons/FavoritesIndicator/FavoritesIndicator"
import AddToFavorites from "@/components/product-page-fragments/AddToFavorites/AddToFavorites"

const loyalityPoints = [11990, 119.90]


export async function generateStaticParams() {
    const response = await fetch(`http://localhost:5001/api/products/all`, {
			cache: "force-cache",
		}).then((res) => res.json())

    const result = response.products.map((product: any) => ({
			category: product.menuCategory?.toLowerCase(),
			// products: product.menuCategory?.toLowerCase(),
			product_slug: product.slug,
		}))
	return result
}

export default async function Product({ params }: { params: any }) {

	if (
		params.category !== "men" &&
		params.category !== "women" &&
		params.category !== "kids"
	) {
		return notFound()
	}

	if (!params.product_slug || params.product_slug === null) {
		return notFound()
	}

	const product = await ProductService.getProductBySlug(params.product_slug)

	return (
		<div className={styles.wrapper}>
			<div className={styles.images_container}>
				{product.images.map((image: string, index: number) => (
					<Image
						key={index}
						src={image}
						alt=""
						width={590}
						height={590}
						className={styles.product_image}
					/>
				))}
			</div>

			<div className={styles.product_info_container}>
				<div className={styles.sticky}>
					<AddToFavorites
						productId={product.productId}
						borderRadius="50%"
						className={styles.add_to_fav_position}
					/>
					<span className={styles.product_title}>{product.name}</span>
					<div className={styles.product_info}>
						<span className={styles.brand}>{product.brand}</span>
						<span className={styles.price}>€{product.price}</span>
						<div>
							<span>Article no. </span>
							{product.article}
						</div>
					</div>

					<SizeForm productId={product.productId} sizes={product.size} />

					<div className={styles.loyality_block}>
						<span>loyality points</span>
						<p>
							Order now to receive{" "}
							<strong>
								{loyalityPoints[0]} loyalty points (€{loyalityPoints[1]})
							</strong>{" "}
							for your order. This amount may vary after logging in.{" "}
							<Link href={"#"}>Learn more about loyality points.</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}