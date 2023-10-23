"use client"

import React from 'react'
import BrandColorFilter from './Brand-color-filter/BrandColorFilter'
import styles from './ProductFilters.module.css'
import SortBy from './Sort-by-filter/SortBy'
import PriceFilter from './Price-filter/PriceFilter'
import qs from "qs"
import { sortList } from "./placeholderData"
import { useFilters } from '@/hooks/useFilters'
import { useEffect, useRef } from 'react'
import { useActions } from '@/hooks/useActions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const fetchCache = "force-no-store"

const ProductFilters = ({
	category,
	filterPositions,
	initialBrands,
	initialColors,
	initialSort,
	initialPrice,
	defaultMinMaxValues,
}: any) => {
	const router = useRouter()
	const path = usePathname()
	const { brands, colors, sortby, minPrice, maxPrice } = useFilters()
	const { setFilters } = useActions()
	const searchParams = useSearchParams()
	const isMounted = useRef(false)

	useEffect(() => {
		setFilters({
			brands: initialBrands,
			colors: initialColors,
			minPrice:
				initialPrice.initialMin !== undefined && initialPrice.initialMin,
			maxPrice:
				initialPrice.initialMax !== undefined && initialPrice.initialMax,
			sortby: initialSort,
		})
	}, [category])

	useEffect(() => {

		if (isMounted.current) {
			let price
			if (minPrice && maxPrice)
				if (minPrice !== defaultMinMaxValues.min || maxPrice !== defaultMinMaxValues.max)
					price = `${minPrice}-${maxPrice}`
			
			const queryParams = qs.stringify({ brands, colors, sortby, price })			
			router.push(`${path}?${queryParams}`, {
				scroll: false,
			})
		}
		isMounted.current = true
	}, [brands, colors, minPrice, maxPrice, sortby])

	return (
		<div className={styles.wrapper}>
			<BrandColorFilter
				items={filterPositions.brands}
				filterName={"Brand"}
				initialValue={initialBrands}
				searchPlaceholder={"Search (Nike, Jordan ...)"}
			/>
			<BrandColorFilter
				items={filterPositions.colors}
				filterName={"Color"}
				initialValue={initialColors}
				searchPlaceholder={"Search (Beige, Black ...)"}
			/>
			<PriceFilter
				min={defaultMinMaxValues.min}
				max={defaultMinMaxValues.max}
				initialPrice={initialPrice}
				defaultMinMaxValues={defaultMinMaxValues}
			/>
			<SortBy sortList={sortList} initialValue={initialSort} />
		</div>
	)
}

export default ProductFilters