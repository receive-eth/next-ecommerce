import styles from './FavoriteIndicator.module.css'
import { FavoritesHeart, FavoritesHeartSelected } from '@/components/SVGS'

interface IFavoritesIndicator {
	isShowing: boolean
	isInFavorites: boolean
    onClick: () => void
}

const FavoritesIndicator = ({
	isShowing,
	isInFavorites,
	onClick,
}: IFavoritesIndicator) => {
	return (
		<>
			{isShowing ? (
				<button className={styles.wrapper} onClick={(e) => {
                    e.preventDefault()
					e.stopPropagation()
                    onClick()
                }}>
					{isInFavorites ? <FavoritesHeartSelected /> : <FavoritesHeart />}
				</button>
			) : (
				<></>
			)}
		</>
	)
}

export default FavoritesIndicator