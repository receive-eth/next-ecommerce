'use client'

import { IChangeEvent } from "./types"
import SimpleInput from "./SimpleInput"
import styles from "./FormInputs.module.css"
import { SizeInputsProps } from "./types"
import { IProduct, IProductSize } from "@/app/admin/types"
import { ISize } from "./types"


const SizeInputs = ({ size, onChange, setFormData }: SizeInputsProps) => {
	
	const handleSizeInput = (event: IChangeEvent, inputName: string) => {
		setFormData((prev: IProduct) => {
			const newSize:ISize = { ...prev.size }
			if (inputName in prev.size) {
				const formatedKey =
					inputName === 'stock'
						? Number(event.target.value)
						: event.target.value
				// типизировать ключи ISize чтобы убрать "as never"
				newSize[inputName as keyof ISize] = formatedKey as never

				return {
					...prev,
					size: newSize,
				}
			}
			return { ...prev }
		})
	}

	return (
		<div className={styles.size_inputs}>
			<SimpleInput
				id="sm"
				symbol="SM"
				value={size.sm}
				type="number"
				maxLength={4}
				onChange={(e) => handleSizeInput(e, "sm")}
			/>
			<SimpleInput
				id="eu"
				symbol="EU"
				value={size.eu}
				type="number"
				maxLength={4}
				onChange={(e) => handleSizeInput(e, "eu")}
			/>
			<SimpleInput
				id="uk"
				symbol="UK"
				value={size.uk}
				type="number"
				maxLength={4}
				onChange={(e) => handleSizeInput(e, "uk")}
			/>
			<SimpleInput
				id="us"
				symbol="US"
				value={size.us}
				type="number"
				maxLength={4}
				onChange={(e) => handleSizeInput(e, "us")}
			/>
			<SimpleInput
				id="stock"
				symbol="№"
				value={size.stock}
				type="number"
				maxLength={4}
				onChange={(e) => handleSizeInput(e, "stock")}
			/>
		</div>
	)
}

export default SizeInputs
