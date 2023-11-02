import styles from './ItemsLoader.module.css'
import { useState } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'

const ItemsLoader = () => {

    const [filled, setFilled] = useState<number>(0)

    return (
			<>
				<div className={styles.bg_mask} />
				<ProgressBar filled={filled} setFilled={setFilled} />
			</>
		)
}

export default ItemsLoader