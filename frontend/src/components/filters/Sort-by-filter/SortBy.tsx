/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import styles from './SortBy.module.css'
import DropdownArrow from "../../SVGS/DropdownArrow.svg"
import { useState, useEffect, useRef } from "react"
import { useActions } from '@/hooks/useActions'
import { useFilters } from '@/hooks/useFilters'
import { useClickOutside } from '@/hooks/useClickOutside'

const SortBy = ({ sortList, initialValue }: any) => {
	const { setSort } = useActions()
	const { sortby } = useFilters()

	const [currentValue, setCurrentValue] = useState<string>(initialValue || '')
	const [isDropdownActive, setDropdownActive] = useState<boolean>(false)

	const [outsideRef] = useClickOutside(() => setDropdownActive(false))

	const handleVisibleFilterStyle = () => {
		if (currentValue !== "" && !isDropdownActive && currentValue !== undefined)
			return styles.filter_visible_fulfilled
		else return styles.filter_visible
	}

	const handleChange = (name: string) => {
		setSort(name)
		setCurrentValue(name)
	}

	const handleSortTitle = () => {
		if (currentValue !== "" && currentValue !== undefined) {
			const foundObj = sortList.find((item: any) => item.name === currentValue)
			return foundObj?.name
		} else {
			return "Sorty by"
		}
	}

	return (
		<div className={styles.filter_wrapper} ref={outsideRef}>
			<div
				className={handleVisibleFilterStyle()}
				onClick={() => setDropdownActive(!isDropdownActive)}
			>
				{handleSortTitle() !== "Sorty by" && (
					<span className={styles.filter_subtitle}>Sort by</span>
				)}

				<div className={styles.combined_filter_title}>
					<span className={styles.filter_title}>{handleSortTitle()}</span>
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
					<ul className={styles.items_list}>
						{sortList.map((sortType: any) => (
							<li key={sortType.id} className={styles.item}>
								<label className={styles.check}>
									<input
										type="checkbox"
										checked={sortby === sortType.name}
										className={styles.hide_checkbox}
										onChange={() => handleChange(sortType.name)}
									/>
									<span className={styles.checkbox} />
									<span className={styles.label_text}>{sortType.name}</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default SortBy