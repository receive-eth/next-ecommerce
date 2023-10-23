'use client'

import React, { ChangeEvent, StyleHTMLAttributes, useState } from 'react'
import styles from './InputWithTitle.module.css'
import { ClosePopup } from '@/components/SVGS'

interface InputWithTitleProps extends React.HTMLAttributes<HTMLInputElement> {
	id: string
	title: string
	value: string
	withButton?: boolean
	isValid: boolean
	errorMessage: string
	validationMessage: string
	isError: boolean
	disabled: boolean
	onButtonClick?: () => void
	onResetButtonClick: () => void
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputWithTitle = ({
	id,
	title,
	value,
    withButton,
	isValid,
	isError,
	disabled,
	errorMessage,
	validationMessage,
    onButtonClick,
	onResetButtonClick,
	className,
    onChange,
}: InputWithTitleProps) => {
	const [isFocused, setFocused] = useState(false)

	const handleTitle = () => {
		if (isFocused || value !== '') return styles.active_title
		    return styles.title
	}

	return (
		<div className={`${styles.wrapper}`}>
			<div className={styles.input_group}>
				<div
					className={`${styles.input_container} ${className}`}
					style={{
						borderBottom: `${`1px solid 
						${isValid ? `green` : isError ? "red" : "gray"}`}`,
					}}
				>
					<label className={handleTitle()} htmlFor={id}>
						{title}
					</label>
					<input
						id={id}
						spellCheck={false}
						value={value}
						disabled={disabled}
						onChange={(e) => onChange(e)}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
					/>
				</div>
				{withButton && value !== "" && !disabled && (
					<button className={styles.apply_btn} onClick={onButtonClick}>
						Apply
					</button>
				)}
				{disabled && (
					<button
						className={styles.reset_promo_btn}
						onClick={onResetButtonClick}
					>
						<ClosePopup className={styles.reset_promo_icon} />
					</button>
				)}
			</div>

			{isValid ? (
				<span className={styles.valid_message}>{validationMessage}</span>
			) : (
				<span className={styles.error_message}>{errorMessage}</span>
			)}
		</div>
	)
}


export default InputWithTitle