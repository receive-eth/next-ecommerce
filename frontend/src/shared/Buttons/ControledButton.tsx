import { HTMLAttributes, MouseEventHandler } from "react"
import styles from './ControlledButton.module.css'

interface IControledButton extends HTMLAttributes<HTMLButtonElement> {
	title?: string
	subTitle?: string
	disabled?: boolean
	disabledTitle?: string
	isContentLoading?: boolean
	onClick?: MouseEventHandler
}

const ControlledButton = ({
	title,
	subTitle,
	disabled,
	isContentLoading,
	disabledTitle,
	onClick,
    className,
}: IControledButton) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${styles.default} ${className}`}
		>
			{isContentLoading ? (
				<div className={styles.loading}>
					<span />
					<span />
					<span />
				</div>
			) : (
				<>
					{disabled ? (
						<span className={styles.title}>{disabledTitle}</span>
					) : (
						<>
							<span className={styles.title}>{title}</span>
							{subTitle && <span className={styles.sub_title}>{subTitle}</span>}
						</>
					)}
				</>
			)}
		</button>
	)
}

export default ControlledButton