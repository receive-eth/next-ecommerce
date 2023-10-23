import styles from './CartItemsLoader.module.css'
import { useState } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'

const CartItemsLoader = () => {

    const [filled, setFilled] = useState<number>(0)

    return (
			<>
				<div className={styles.bg_mask} />
				<ProgressBar filled={filled} setFilled={setFilled} />
			</>
		)
}

export default CartItemsLoader