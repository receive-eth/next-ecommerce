import styles from './CartNotFound.module.css'
import { CartNoItems } from '@/components/SVGS'
import { useAuth } from '@/hooks/useAuth'
import ControlledButton from '@/shared/Buttons/ControledButton'
import { useRouter } from 'next/navigation'

const CartNotFound = () => {

    const router = useRouter()
    const { user } = useAuth()

    const handleRoute = (gender: string) => {
        if (gender === "female") return "women"

        return 'men'
    }

    return (
			<div className={styles.wrapper}>
				<CartNoItems />
				<div className={styles.right}>
					<h3>You have no items in cart</h3>
					<span>To select items, go to the catalog</span>
					<ControlledButton
						title="GO"
						className={styles.button}
						onClick={() => router.push(`/${handleRoute(user?.gender) || "men"}`)}
					/>
				</div>
			</div>
		)
}

export default CartNotFound