import { HTMLAttributes, useEffect, useState } from 'react'
import styles from './ProgressBar.module.css'

interface IProgressBar extends HTMLAttributes<HTMLDivElement>{
	filled: number
	setFilled: Function
}

const ProgressBar = ({ filled, setFilled, className }: IProgressBar) => {
	useEffect(() => {
		let timeOut: any
		if (filled <= 100) {
			timeOut = setTimeout(() => setFilled((prev: number) => (prev += 5)), 50)
		}

		return () => {
			setFilled(100)
			clearTimeout(timeOut)
		}
	}, [filled])

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<div
				style={{
					height: "100%",
					width: `${filled}%`,
					backgroundColor: "#8e8e8e",
					transition: "width 0.5s",
				}}
			/>
		</div>
	)
}

export default ProgressBar