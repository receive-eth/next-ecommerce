import { Favorites } from "@/components/SVGS"
import styles from './AddToFavorites.module.css'

interface IFavorites {
    type?: string
    radius?: number | string
    strokeColor?: string
}



const AddToFavorites = ({ type, radius, strokeColor }: IFavorites) => {
	const variant =
		type === "rectangle"
			? { borderRadius: `${radius}px` }
			: type === "circle"
			? { borderRadius: "50%" }
			: {}

	return (
		<button
			style={{ background: "none", border: "none" }}
			className={styles.btn}
		>
			<div
				className={styles.favorites_wrapper}
				style={{ ...variant, border: `1px solid ${strokeColor}` }}
			>
				<Favorites className={styles.favorites_icon} />
			</div>
		</button>
	)
}

export default AddToFavorites
