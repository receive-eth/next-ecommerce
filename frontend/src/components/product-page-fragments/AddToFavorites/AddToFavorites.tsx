'use client'

import styles from './AddToFavorites.module.css'
import FavoritesIndicator from "@/shared/Buttons/FavoritesIndicator/FavoritesIndicator"
import { useFavorites } from '@/hooks/useFavorites'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { checkWhetherInFavorites } from '@/utils/checkWhetherInFavorites'

interface IAddToFavorites {
	productId: string
	borderRadius?: string
	className?: string
}

const AddToFavorites = ({
	productId,
	borderRadius,
	className,
}: IAddToFavorites) => {
	const { products, isLoading } = useFavorites()
	const { user } = useAuth()
	const { addToFavorites, removeFromFavorites } = useActions()

	const isInFavorites = checkWhetherInFavorites({
		user,
		isLoading,
		products,
		productId,
	})

	const handleClick = () => {
		if (!user) return

		console.log("IS IN: ", isInFavorites)

		if (!isInFavorites) return addToFavorites({ userId: user.id, productId })

		return removeFromFavorites({ userId: user.id, productId })
	}

	return (
		<div className={className}>
			<div
				className={styles.favorites_wrapper}
				style={{ borderRadius: borderRadius }}
			>
				<FavoritesIndicator
					isShowing
					isInFavorites={isInFavorites}
					onClick={handleClick}
					className={styles.favorites_position}
				/>
			</div>
		</div>
	)
}
export default AddToFavorites