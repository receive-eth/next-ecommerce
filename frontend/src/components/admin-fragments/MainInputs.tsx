"use client"
import { Dispatch, SetStateAction } from "react"
import { IProduct } from "@/app/admin/types"
import styles from "./FormInputs.module.css"
import SimpleInput from "./SimpleInput"
import { IChangeEvent } from "./types"
import SizeInputs from "./SizeInputs"

interface MainInputsProps {
	formData: IProduct
	setFormData: Dispatch<SetStateAction<IProduct>>
	onChange: (event: IChangeEvent, inputName: string) => void
}

const MainInputs = ({ formData, onChange, setFormData }: MainInputsProps) => {
	return (
		<div className={styles.main_inputs}>
			<div className={styles.div_labels}>
				<label htmlFor="name">Name</label>
				<label htmlFor="brand">Brand</label>
				<label htmlFor="color">Color</label>
				<label htmlFor="price">Price</label>
				<label htmlFor="article">Article</label>
			</div>
			<div className={styles.div_inputs}>
				<SimpleInput
					id="name"
					value={formData.name}
					onChange={(e) => onChange(e, "name")}
				/>
				<SimpleInput
					id="brand"
					value={formData.brand}
					onChange={(e) => onChange(e, "brand")}
				/>
				<SimpleInput
					id="color"
					value={formData.color}
					onChange={(e) => onChange(e, "color")}
				/>
				<SimpleInput
					id="price"
					type="number"
					value={formData.price}
					symbol="€"
					onChange={(e) => onChange(e, "price")}
				/>
				<SimpleInput
					id="article"
					value={formData.article}
					onChange={(e) => onChange(e, "article")}
				/>
				<SizeInputs size={formData.size} onChange={onChange} setFormData={setFormData} />
				<textarea
					placeholder="Description"
					className={styles.description}
					spellCheck={false}
					onChange={(e) => onChange(e, "description")}
					value={formData.description}
				/>
			</div>
		</div>
	)
}

export default MainInputs
