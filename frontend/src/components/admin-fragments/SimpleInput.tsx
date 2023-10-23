'use client'

import { CSSProperties, ChangeEvent } from "react"
import styles from "./FormInputs.module.css"

export interface ISingleInputProps {
	id?: string
	value: string | number
	style?: CSSProperties
	symbol?: string
	maxLength?: number
	max?: number
	min?: number
	type?: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const SimpleInput = ({
	id,
	value,
	type,
	symbol,
	maxLength,
	max,
	min,
	onChange,
	style,
}: ISingleInputProps) => {
	return (
		<div className={styles.simple_input} style={style}>
			<input
				type={type}
				maxLength={maxLength}
				min={min}
				max={max}
				id={id}
				value={value}
				onChange={onChange}
				style={style}
				spellCheck={false}
			/>
			<span>{symbol}</span>
		</div>
	)
}

export default SimpleInput
