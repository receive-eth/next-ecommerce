import { ChangeEventHandler } from 'react'
import styles from './CustomCheckbox.module.css'

interface ICheckboxProps {
	checkCondition: boolean
	onChange: ChangeEventHandler<HTMLInputElement>
	labelText?: string | undefined
}

const CustomCheckbox = ({ checkCondition, onChange, labelText }: ICheckboxProps) => {
	return (
		<label className={styles.check}>
			<input
				type="checkbox"
				checked={checkCondition}
				className={styles.hide_checkbox}
				onChange={onChange}
			/>
			<span className={styles.checkbox} />
			<span className={styles.label_text}>{labelText}</span>
		</label>
	)
}

export default CustomCheckbox