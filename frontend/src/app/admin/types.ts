import { Dispatch, SetStateAction } from "react"

export interface IProduct {
	// productId: string
	name: string
	description: string
	brand: string
	color: string
	images: string[]
	price: number
	size: IProductSize
	category: string
	menuCategory: string
	article: string
	slug: string
}

export interface IProductSize {
  sm: string
  eu: string
  uk: string
  us: string
  stock: number
}


// type IEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export interface IFormInputsProps {
    formData: IProduct,
    setFormData: Dispatch<SetStateAction<IProduct>>
}