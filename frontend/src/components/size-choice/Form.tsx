"use client"

import styles from './SizeChoice.module.css'
import SizeChoice from './SizeChoice'
import { useActions } from '@/hooks/useActions'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { FormEvent } from 'react'
import { sizeTypes } from '@/data'
import { useCart } from '@/hooks/useCart'

const SizeForm = ({ productId, sizes }: any) => {
    
    const { user, isLoading } = useAuth()
	const { anonimousCartId } = useCart()
	const { addToCart } = useActions()

	const [currentSizeId, setCurrentSizeId] = useState<string | null>(null)

	const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const matchingSizeId = (sizes.find((size: any) => size.sizeId === currentSizeId)).sizeId

		addToCart({
			userId: user?.id || anonimousCartId,
			productId,
			sizeId: matchingSizeId,
			isAnonimous: !user ? true : false,
		})
	}

	return (
		<>
			{!isLoading ? (
				<form className={styles.form} onSubmit={(e) => handleSumbit(e)}>
					<SizeChoice
						className={styles.size_choice}
						currentSizeId={currentSizeId}
						setCurrentSizeId={setCurrentSizeId}
						sizeTypes={sizeTypes}
						sizeList={sizes}
						height={'50px'}
						width='100%'
					/>
					<button className={styles.formButton} type="submit">
						Add to cart
					</button>
				</form>
			) : (
				<>Loading ...</>
			)}
		</>
	)
}

export default SizeForm