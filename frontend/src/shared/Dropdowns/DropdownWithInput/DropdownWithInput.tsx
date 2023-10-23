import styles from './DropdownWithInput.module.css'
import { DropdownArrow, Discount } from "@/components/SVGS"

interface DropdownWithInputProps {
    isOpen: boolean
    onClick: () => void
}

const DropdownWithInput = ({ isOpen, onClick }: DropdownWithInputProps) => {
	return (
		<div className={styles.discounts} onClick={onClick}>
			<div>
				<Discount className={styles.discounts_img} />
				<span>Discounts and certificates</span>
			</div>

			<DropdownArrow
				className={
					isOpen ? styles.dropdown_image_active : styles.dropdown_image
				}
			/>
		</div>
	)
}


export default DropdownWithInput