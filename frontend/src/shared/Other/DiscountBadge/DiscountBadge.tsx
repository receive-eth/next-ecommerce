import styles from './DiscountBadge.module.css'

interface IDiscountBadge {
    text: string
}

const DiscountBadge = ({ text }: IDiscountBadge) => {
	return (
		<span className={styles.wrapper}>
			<span className={styles.badge_text}>{text}</span>
		</span>
	)
}

export default DiscountBadge