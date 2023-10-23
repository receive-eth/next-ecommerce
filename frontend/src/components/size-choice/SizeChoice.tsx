'use client'

import { useState } from 'react'
import styles from './SizeChoice.module.css'
import DropdownArrow from '../SVGS/DropdownArrow.svg'


const SizeChoice = ({
	currentSizeId,
	setCurrentSizeId,
	sizeList,
	sizeTypes,
	className,
}: any) => {
	const [isDropdownActive, setDropdownActive] = useState<boolean>(false)
	const [currentSizeType, setCurrentSizeType] = useState(sizeTypes[0])

	const handleChange = (sizeId: number) => {
		if (sizeId === currentSizeId) {
			setCurrentSizeId(null)
			return
		}
		setCurrentSizeId(sizeId)
	}

	const handleSizeChoiceTitle = () => {
		if (currentSizeId) {
			const foundObj = sizeList.find(
				(item: any) => item.sizeId === currentSizeId
			)
			return `${foundObj[currentSizeType]} ${currentSizeType}`
		} else {
			return "Size"
		}
	}

	const handleVisibleStyle = () => {
		if (currentSizeId && !isDropdownActive) return styles.visible_fulfilled
		else return styles.visible
	}

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<div
				className={handleVisibleStyle()}
				onClick={() => setDropdownActive(!isDropdownActive)}
			>
				{handleSizeChoiceTitle() !== "Size" && (
					<span className={styles.subtitle}>Size</span>
				)}

				<div className={styles.combined_title}>
					<span className={styles.filter_title}>{handleSizeChoiceTitle()}</span>
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
				<div className={styles.hidden}>
					<div className={styles.panel}>
						<ul>
							{sizeTypes.map((sizeType: string, i: number) => (
								<li
									className={styles.panelSize}
									key={i}
									onClick={() => setCurrentSizeType(sizeType)}
								>
									<button
										type="button"
										className={
											currentSizeType === sizeType ? styles.activeSize : ""
										}
									>
										{sizeType}
									</button>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.items_list_wrapper}>
						<ul className={styles.items_list}>
							{sizeList.map((size: any) => (
								<li key={size.sizeId} className={styles.item}>
									<label className={styles.check}>
										<input
											type="checkbox"
											checked={currentSizeId === size.sizeId}
											className={styles.hide_checkbox}
											onChange={() => handleChange(size.sizeId)}
										/>
										<span className={styles.checkbox} />
										<span className={styles.label_text}>
											{size[currentSizeType]}
										</span>
									</label>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default SizeChoice