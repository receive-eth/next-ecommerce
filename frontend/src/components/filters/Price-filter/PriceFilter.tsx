"use client"

import styles from "./PriceFilter.module.css"
import DropdownArrow from "../../SVGS/DropdownArrow.svg"
import React, { useEffect, useRef, useState } from "react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { useActions } from "@/hooks/useActions"
import { useFilters } from "@/hooks/useFilters"
interface IinitialPrice {
	initialMin: number
	initialMax: number
}

interface IPriceFilterProps {
	min: number
	max: number
	initialPrice: IinitialPrice
	defaultMinMaxValues: {min: number, max: number}
}

const PriceFilter = ({
	min,
	max,
	initialPrice,
	defaultMinMaxValues,
}: IPriceFilterProps) => {
	const { setMinPrice, setMaxPrice } = useActions()

	const [isDropdownActive, setDropdownActive] = useState<boolean>(false)
	const [minVal, setMinVal] = useState<number>(Number(initialPrice.initialMin || defaultMinMaxValues.min))
	const [maxVal, setMaxVal] = useState<number>(Number(initialPrice.initialMax || defaultMinMaxValues.max))
	
	const [outsideRef] = useClickOutside(() => setDropdownActive(false))
	
	const MIN_RANGE = 1

	const handleVisibleFilterStyle = () => {
		if (!isDropdownActive && handleFilterTitle() !== "Price") {
			return styles.filter_visible_fulfilled
		}
		return styles.filter_visible
	}

	const handleFilterTitle = () => {
		if (initialPrice.initialMin && initialPrice.initialMax)
			return `€${initialPrice.initialMin} - €${initialPrice.initialMax}`
		return `Price`
	}

	const handleApplyButton = () => {
		if (minVal !== undefined) {
			if (
				Number(minVal) > min + MIN_RANGE ||
				Number(maxVal) < max - MIN_RANGE
			) {
				setMinPrice(minVal)
				setMaxPrice(maxVal)
			} else {
				setMinPrice(min)
				setMaxPrice(max)
			}
		}
	}

	const handleMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Math.min(Number(event.target.value), maxVal - MIN_RANGE)
		setMinVal(value)
	}

	const handleMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Math.max(Number(event.target.value), minVal + MIN_RANGE)
		setMaxVal(value)
	}

	return (
		<div className={styles.filter_wrapper} ref={outsideRef}>
			<div
				className={handleVisibleFilterStyle()}
				onClick={() => setDropdownActive(!isDropdownActive)}
			>
				{handleFilterTitle() !== "Price" && (
					<span className={styles.filter_subtitle}>Price</span>
				)}

				<div className={styles.combined_filter_title}>
					<span className={styles.filter_title}>{handleFilterTitle()}</span>
				</div>
				<DropdownArrow
					className={
						isDropdownActive
							? styles.dropdown_arrow_dropped
							: styles.dropdown_arrow
					}
				/>
			</div>
			{isDropdownActive && (
				<div className={styles.filter_hidden}>
					<div className={styles.price_inputs}>
						<label>
							<span>From</span>
							<input
								type="currency"
								placeholder="minPrice"
								className={styles.input_field}
								value={minVal || min}
								disabled={true}
								onChange={(event) => {
									handleMinValue(event)
								}}
							/>
						</label>

						<label>
							<span>To</span>
							<input
								type="currency"
								placeholder="maxPrice"
								className={styles.input_field}
								value={maxVal || max}
								disabled={true}
								onChange={(event) => {
									handleMaxValue(event)
								}}
							/>
						</label>
					</div>

					<div className={styles.from_to_price}>
						<span>{minVal}€</span>
						<span>{maxVal}€</span>
					</div>

					<div className={styles.slider_wrapper}>
						<div className={styles.slider}>
							<div className={styles.progress}></div>
						</div>

						<div className={styles.rangeInput}>
							<input
								type="range"
								className={styles.range_min}
								onChange={(event) => {
									handleMinValue(event)
								}}
								min={min}
								max={max}
								value={minVal}
								style={{ zIndex: Number(minVal > max - 100 && "3") }}
							/>
							<input
								type="range"
								className={styles.range_max}
								onChange={(event) => {
									handleMaxValue(event)
								}}
								min={min}
								max={max}
								value={maxVal}
							/>
						</div>
					</div>

					<div className={styles.price_filter_footer}>
						<span>{maxVal - minVal} products</span>
						<button onClick={handleApplyButton} className={styles.apply_button}>
							Apply
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default PriceFilter


			// if (minPrice === String(min) && maxPrice === String(max)) {
			// 	return `Price`
			// }

			// if (minPrice !== String(min) || maxPrice !== String(max))
			// 	return `€${minVal} - €${maxVal}`