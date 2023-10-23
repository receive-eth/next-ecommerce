import styles from './Discount.module.css'
import { ChangeEvent, HTMLAttributes, useState } from 'react'
import { Discount as DiscountImg, DropdownArrow } from "@/components/SVGS"
import InputWithTitle from '@/shared/Inputs/InputWithTitle/InputWithTitle'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

interface DiscountProps {
	isDropped: boolean
	setDropped: (state: boolean) => void
}

const Discount = ({ isDropped, setDropped }: DiscountProps) => {
	const [value, setCurrentValue] = useState<string>("")

	const { checkDiscount, resetDiscount } = useActions()
	const { user } = useAuth()
	const { discount, errors } = useCart()

	const onResetButtonClick = () => {
		setCurrentValue('')
		resetDiscount()
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentValue(e.target.value)
		resetDiscount()
	}

	return (
		<div className={styles.discounts}>
			<div
				className={styles.discounts_title}
				onClick={() => setDropped(!isDropped)}
			>
				<div>
					<DiscountImg className={styles.discounts_img} />
					<span>Discounts and certificates</span>
				</div>

				<DropdownArrow
					className={
						isDropped ? styles.dropdown_image_active : styles.dropdown_image
					}
				/>
			</div>

			{isDropped && (
				<div className={styles.discounts_content}>
					<InputWithTitle
						id="123"
						value={value}
						withButton
						title="Promocode"
						isValid={!!discount}
						isError={!!errors.discount}
						disabled={!!discount}
						errorMessage={!!errors.discount ? errors.discount : ""}
						validationMessage={
							!!discount && value === discount?.promocode
								? "Promocode is applied"
								: ""
						}
						onChange={handleChange}
						onButtonClick={() =>
							checkDiscount({ userId: user.id, promocode: value })
						}
						onResetButtonClick={onResetButtonClick}
						className={styles.customized_input}
					/>
				</div>
			)}
		</div>
	)
}

export default Discount