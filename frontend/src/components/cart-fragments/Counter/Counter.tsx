'use client'
import styles from './Counter.module.css'

interface ICounter {
	onPlusClick: (value: any) => void
	onMinusClick: (value: any) => void
	count: number
	disableMinus: boolean
	disablePlus: boolean
}


const Counter = ({
	onPlusClick,
	onMinusClick,
	count,
	disableMinus,
	disablePlus,
}: ICounter) => {
	return (
		<div className={styles.wrapper}>
			<button disabled={disableMinus} onClick={onMinusClick}>–</button>
			<span>{count}</span>
			<button disabled={disablePlus} onClick={onPlusClick}>+</button>
		</div>
	)
}

export default Counter