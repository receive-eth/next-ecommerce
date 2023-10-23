'use client'

import styles from './SingleDropdown.module.css'
import { HTMLAttributes, useState } from "react"
import { DropdownArrow } from '@/components/SVGS'

interface variant {
	id: number,
	name: string,
}

interface IProps extends HTMLAttributes<HTMLDivElement>{
	variants: Array<variant>
	inputName: string
	defaultValue: string
	onChoice: Function
}

const DropdownSingleChoice = ({
	variants,
	inputName,
	defaultValue,
	onChoice,
}: IProps) => {
	const [isDropdownActive, setDropdownActive] = useState<boolean>(false)
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const handleVisibleFilterStyle = () => {
		if (currentIndex !== 0 && !isDropdownActive)
			return styles.filter_visible_fulfilled
		else return styles.filter_visible
	}

	const handleChange = (id: number) => {
		setCurrentIndex(id)
		const value = variants.find((item: any) => item.id === id)
		onChoice(inputName, value?.name)
	}

	const handleTitle = () => {
		if (currentIndex !== 0) {
			const foundObj = variants.find((item: variant) => item.id === currentIndex)
			return foundObj?.name
		} else {
			return defaultValue
		}
	}

	return (
		<div className={styles.filter_wrapper}>
			<div
				className={handleVisibleFilterStyle()}
				onClick={() => setDropdownActive(!isDropdownActive)}
			>
				{handleTitle() !== defaultValue && (
					<span className={styles.filter_subtitle}>{defaultValue}</span>
				)}

				<div className={styles.combined_filter_title}>
					<span className={styles.filter_title}>{handleTitle()}</span>
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
						{variants.map((variant: any) => (
							<li key={variant.id} className={styles.item}>
								<label className={styles.check}>
									<input
										type="checkbox"
										checked={currentIndex === variant.id}
										className={styles.hide_checkbox}
										onChange={() => handleChange(variant.id)}
									/>
									<span className={styles.checkbox} />
									<span className={styles.label_text}>{variant.name}</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default DropdownSingleChoice