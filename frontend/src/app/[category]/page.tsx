import PageCategoryTitle from "@/components/page-category/PageCategoryTitle";
import ProductFilters from "@/components/filters/ProductFilters";
import styles from './page.module.css'
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import ProductService from "@/services/ProductService"
import qs from 'qs'
import { notFound } from "next/navigation"
import { IFilterPositions } from "./types";
import DefaultProduct from "@/shared/Product/Default/DefaultListItem";
import { withLink } from "@/shared/Modifiers/withLink";
import { IProduct } from "../admin/types";

export default async function Products({ searchParams, params }: { searchParams: {[key: string]: string | string[] | undefined }, params: any } ) {

	if (
		params.category !== "men" &&
		params.category !== "women" &&
		params.category !== "kids"
	) {
		return notFound()
	}
	const PER_PAGE: any = process.env.PER_PAGE
	const currentPage = searchParams["page"] ?? 1

	const brands = []
	const colors = []
	let sortby
	let minPrice
	let maxPrice

	for (const [key, value] of Object.entries(searchParams)) {
		if (key.includes("brands")) brands.push(value)
		if (key.includes("colors")) colors.push(value)
		if (key.includes("sortby")) sortby = value
		if (key.includes("price")) {
			const array = (value as String).split("-")
			minPrice = array[0]
			maxPrice = array[1]
		}
	}

	const paginatedProducts = await ProductService.getAllProductsPaginated(
		currentPage,
		params.category,
		brands,
		colors,
		sortby,
		minPrice,
		maxPrice,
	)

	const { totalCount, products, defaultLimitValues } = paginatedProducts
	const finalPage = Math.ceil(totalCount / PER_PAGE)

	const filterPositions: IFilterPositions =
		await ProductService.getAvailableFilterPositions(
			qs.stringify({
				brands,
				colors,
				category: params.category,
				price: `${minPrice}-${maxPrice}`,
			})
		)

		return (
			<div className={styles.product_page_wrapper}>
				<PageCategoryTitle text={params.category} count={totalCount} />
				<ProductFilters
					category={params.category}
					filterPositions={filterPositions}
					initialBrands={brands}
					initialColors={colors}
					initialSort={sortby}
					initialPrice={{ initialMin: minPrice, initialMax: maxPrice }}
					defaultMinMaxValues={{
						min: defaultLimitValues.min,
						max: defaultLimitValues.max,
					}}
				/>
				<div className={styles.products_wrapper}>
					{products.map((product: any) => {
						const WrappedDefaultProduct = withLink(DefaultProduct, {
							href: `/${params.category}/${product.slug}`,
						})
						
						return (
							<DefaultProduct
								key={product.article}
								productId={product.productId}
								name={product.name}
								brand={product.brand.name}
								color={product.color.name}
								size={product.size}
								price={product.price}
								images={product.images}
								// article={product.article}
								category={params.category}
								slug={product.slug}
								settings={{
									showBrand: true,
									showColor: true,
									showPrice: true,
									withUnderlineOnProductHover: true,
									isNameWrappedWithLink: true,
								}}
							/>
						)
					})}
				</div>
				<div className={styles.underline} />
				<Pagination
					hasNextPage={Number(currentPage) !== finalPage}
					hasPrevPage={Number(currentPage) !== 1}
					totalPages={finalPage}
					currentPage={currentPage}
				/>
			</div>
		)
}
