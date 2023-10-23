'use client'

import React, { useRef, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import { ImageChoice, Delete } from "@/components/SVGS"
import FormInputs from '@/components/admin-fragments/FormInputs'
import { toBase64 } from '@/utils/toBase64'
import axios from 'axios'
import { IProduct, IProductSize } from "./types"


const AdminPanel = () => {
	const [formData, setFormData] = useState<IProduct>({
		name: "",
		description: "",
		brand: "",
		color: "",
		images: [],
		price: 0,
		size: { sm: "", eu: "", uk: "", us: "", stock: 0 },
		category: "",
		menuCategory: "",
		article: "",
		slug: "",
	})

	const singleFilePickerRef = useRef<any>(null)

	const [isLoading, setIsLoading] = useState(false)

	const handleSingleImagePick = async (event: any) => {
		const filesList = event.target.files
		const based64: string = await toBase64(filesList[0])

		setFormData((prevState: IProduct) => ({
			...prevState,
			images: [...prevState.images, based64],
		}))
	}

	const handleSinglePickerClick = () => {
		singleFilePickerRef.current.click()
	}

	const handleDeleteImage = (indexToDelete: number) => {
		setFormData((prevState: IProduct) => {
			const array = [...prevState.images]
			array.splice(indexToDelete, 1)
			return {
				...prevState,
				images: [...array],
			}
		})
	}

	const handleCreateProduct = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		const result = await axios.post(
			"http://localhost:5001/api/products/create",
			formData
		)

		setIsLoading(false)
	}

	return (
		<form className={styles.wrapper} onSubmit={handleCreateProduct}>
			<FormInputs formData={formData} setFormData={setFormData} />

			<div className={styles.selectedImages}>
				{formData.images?.map((image: any, i: any) => {
					return (
						<div key={i} className={styles.image_wrapper}>
							<Image src={image} alt="" width={200} height={200} />
							<Delete
								className={styles.delete_image}
								onClick={() => handleDeleteImage(i)}
							/>
						</div>
					)
				})}
				<div>
					<input
						ref={singleFilePickerRef}
						type="file"
						onChange={handleSingleImagePick}
						accept="image/*, .png, .jpg, .gif, .web"
						className={styles.hidden_file_input}
					/>
					{formData.images.length !== 5 && (
						<button type="button" className={styles.image_choice_wrapper}>
							<ImageChoice
								width={200}
								height={200}
								fill={"#767676"}
								onClick={handleSinglePickerClick}
								className={styles.image_choice}
							/>
						</button>
					)}
				</div>
			</div>

			<button type="submit" className={styles.submit_button}>
				{isLoading ? "Loading..." : "Create product"}
			</button>
		</form>
	)
}

AdminPanel.isOnlyAdmin = true

export default AdminPanel