'use client'

import styles from './Dropdown.module.css'
import { DropdownArrow } from '@/components/SVGS'
import { useEffect, useRef, useState } from 'react'


export default function Dropdown({ handleFormChange }: { handleFormChange: Function}) {
	const dropdownData = [
		{ id: 1, sex: "male" },
		{ id: 2, sex: "female" },
		{ id: 3, sex: "not specified" },
	]

	const [isDropdownActive, setDropdownActive] = useState(false)
	const [currentValue, setCurrentValue] = useState("Not chosen")

	const dropDownRef = useRef(null)

	const handleClick = (value: string) => (event: React.MouseEvent) => {
		setDropdownActive(!isDropdownActive)
		setCurrentValue(value)
		handleFormChange({ gender: value})
	}

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (!event.composedPath().includes(dropDownRef.current)) {
				setDropdownActive(false)
			}
		}

		document.body.addEventListener("click", handleClickOutside)

		return () => {
			document.body.removeEventListener("click", handleClickOutside)
		}
	}, [])

	return (
		<div className={styles.dropdown_menu} ref={dropDownRef}>
			<div
				className={styles.dropdown_visible}
				onClick={() => setDropdownActive(!isDropdownActive)}
			>
				<span>{currentValue}</span>
				<DropdownArrow
					className={
						isDropdownActive
							? styles.dropdown_image_active
							: styles.dropdown_image
					}
				/>
			</div>

			{isDropdownActive && (
				<ul className={styles.dropdown_hidden}>
					{dropdownData.map((item) => (
						<li
							key={item.id}
							className={styles.dropdown_item}
							onClick={handleClick(item.sex)}
						>
							{item.sex}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

