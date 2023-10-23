'use client'

import styles from './BrandColorFilter.module.css'
import DropdownArrow from "../../SVGS/DropdownArrow.svg"
import { useClickOutside } from '@/hooks/useClickOutside'
import { useState, useEffect, ChangeEvent } from "react"
import { capitalize } from "@/utils/Formats"
import { useActions } from "@/hooks/useActions"

const BrandColorFilter = ({
	items,
	filterName,
	searchPlaceholder,
	initialValue,
}: any) => {
	const { setBrands, setColors } = useActions()
	const [isDropdownActive, setDropdownActive] = useState<boolean>(false)
	const [currentValue, setCurrentValue] = useState<Array<string>>(initialValue)
	const [filterItems, setFilterItems] = useState(items)
	const [inputText, setInputText] = useState('')

	const [ outsideRef ] = useClickOutside(() => setDropdownActive(false))

	useEffect(() => {
		setFilterItems(items)
	}, [items])


	const handleArray = (
		array: Array<string | number>,
		value: string | number,
		setFunc: Function
	) => {
		if (array.includes(value)) {
			const newArray = [...array]
			setFunc(newArray.filter((el) => el !== value))
		} else {
			setFunc([...array, value])
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
		handleArray(currentValue, value, setCurrentValue)

		if (filterName === "Brand") handleArray(currentValue, value, setBrands)
		if (filterName === "Color") handleArray(currentValue, value, setColors)
		setInputText('')
	}

	const checkWhetherLastArrElement = (
		array: Array<string | number>,
		value: string
	) => {
		const index = array.length - 1
		const lastArrEl = array[index]
		return value === lastArrEl
	}

	const handleVisibleFilterStyle = () => {
		if (currentValue.length !== 0 && !isDropdownActive)
			return styles.filter_visible_fulfilled
		else return styles.filter_visible
	}

	const handleFilterTitle = () => {
		if (currentValue.length !== 0) {
			return currentValue.map((value) => {
				const wordSeparator = `, `
				const isLastElement = checkWhetherLastArrElement(currentValue, value)
				return `${capitalize(value)}${
					isLastElement === false ? wordSeparator : ""
				}`
			})
		} else {
			return filterName
		}
	}

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const matching = items.filter((el: any) => {
			const inputValue = event.target.value.toLowerCase()
			return el.name.toLowerCase().includes(inputValue)
		})
		setInputText(event.target.value.toLowerCase())
		setFilterItems(matching)
	}

	return (
		<div className={styles.filter_wraper} ref={outsideRef}>
			<div
				className={handleVisibleFilterStyle()}
				onClick={() => setDropdownActive(!isDropdownActive)}
			>
				{handleFilterTitle() !== filterName && (
					<span className={styles.filter_subtitle}>{filterName}</span>
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
					<input
						className={styles.input}
						placeholder={searchPlaceholder}
						value={inputText}
						onChange={(e) => handleSearch(e)}
					/>
					<ul className={styles.items_list}>
						{filterItems?.map((item: any) => (
							<li key={item.id} className={styles.item}>
								<label className={styles.check}>
									<input
										type="checkbox"
										checked={currentValue.includes(item.name)}
										className={styles.hide_checkbox}
										onChange={(e) => handleChange(e, item.name)}
									/>
									<span className={styles.checkbox} />
									<span className={styles.label_text}>
										{item.name}{" "}
										<span className={styles.items_count}>({item.count})</span>
									</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default BrandColorFilter
