"use client"

import styles from "./FormInputs.module.css"
import DropdownSingleChoice from "@/shared/Dropdowns/SingleDropdown/SingleDropdown"
import { IFormInputsProps, IProduct } from "@/app/admin/types"
import { IChangeEvent } from "./types"
import MainInputs from "./MainInputs"
import { encodeProductSlug } from "@/utils/Formats"


const placeholderCategory = [
	{ id: 1, name: "Sneakers" },
	{ id: 2, name: "Apparel" },
	{ id: 3, name: "Accessoires" },
]

const placeholderMenuCategory = [
	{ id: 1, name: "Men" },
	{ id: 2, name: "Women" },
	{ id: 3, name: "Kids" },
]

const FormInputs = ({ formData, setFormData }: IFormInputsProps) => {
	
	const handleInput = (event: IChangeEvent, inputName: string) => {

		setFormData((prev: IProduct) => {
			const price = Number(formData.price)
			const slug = encodeProductSlug(
				formData.name.toLowerCase(),
				String(formData.article).toLowerCase()
			)
			return {
				...prev,
				price,
				slug,
				[inputName]: event.target.value,
			}})
	}

	const handleDropdown = (inputName: string, value: string) => {
		setFormData((prev: IProduct) => ({
			...prev,
			[inputName]: value,
		}))
	}

	return (
		<div className={styles.input_forms}>
			<MainInputs
				setFormData={setFormData}
				formData={formData}
				onChange={handleInput}
			/>
			<div className={styles.dropdowns}>
				<DropdownSingleChoice
					inputName="category"
					variants={placeholderCategory}
					defaultValue={"Category"}
					style={{
						width: "50%",
						zIndex: "3",
						position: "relative",
					}}
					onChoice={handleDropdown}
				/>
				<DropdownSingleChoice
					inputName="menuCategory"
					variants={placeholderMenuCategory}
					defaultValue={"Menu Category"}
					style={{
						width: "50%",
						zIndex: "2",
						position: "relative",
					}}
					onChoice={handleDropdown}
				/>
			</div>
		</div>
	)
}

export default FormInputs
