import styles from './FavoriteIndicator.module.css'
import { FavoritesHeart, FavoritesHeartSelected, FavoritesHeartGray } from '@/components/SVGS'
import Favorites from "@/components/SVGS/Favorites.svg"

interface IFavoritesIndicator {
	isShowing: boolean
	isInFavorites: boolean
	isGray?: boolean
	isHovering?: boolean
	className?: string
    onClick: () => void
}

const FavoritesIndicator = ({
	isShowing,
	isInFavorites,
	className,
	onClick,
	isGray,
}: IFavoritesIndicator) => {
	return (
		<>
			{isShowing ? (
				<button
					className={`${styles.wrapper} ${className}`}
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						onClick()
					}}
				>
					{isInFavorites ? (
						<FavoritesHeartSelected className={styles.favorites} />
					) : (
						<>
							{isGray ? (
								<FavoritesHeartGray className={styles.favorites} />
							) : (
								<FavoritesHeart className={styles.favorites} />
							)}
						</>
					)}
				</button>
			) : (
				<></>
			)}
		</>
	)
}

export default FavoritesIndicator