import { ChangeEvent } from "react"
import { Dispatch, SetStateAction } from "react"
import { IProduct } from "@/app/admin/types"

export type IChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export interface ISize {
	sm: string
	eu: string
	uk: string
	us: string
	stock: number
}

export interface SizeInputsProps {
	size: ISize
	setFormData: Dispatch<SetStateAction<IProduct>>
	onChange: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void
}
