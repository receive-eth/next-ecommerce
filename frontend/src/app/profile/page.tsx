'use client'
import styles from './page.module.css'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function Profile() {
	
	const { user } = useAuth()

	return (
		<div className={styles.container}>
			<h1 className={styles.page_title}>My Account</h1>

			<div className={styles.account_info_block}>
				<span className={styles.section_title}>Account information</span>
				<div className={styles.rectangle_group}>
					<div className={styles.rectangle}>
						<span>Contact Information</span>
						<p>
							{user?.firstName} {user?.lastName}
						</p>
						<p>{user?.email}</p>
						<div className={styles.rectangle_actions}>
							<Link href={"#"}>Edit</Link>
							<Link href={"#"}>Change password</Link>
						</div>
					</div>

					<div className={styles.rectangle}>
						<span>Newsletter</span>
						<p>Get info from user</p>
						<div className={styles.rectangle_actions}>
							<Link href={"#"}>Edit</Link>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.account_info_block}>
				<span className={styles.section_title}>Address Book</span>
				<div className={styles.rectangle_group}>
					<div className={styles.rectangle}>
						<span>Default Billing Address</span>
						<p>Get info from user</p>
						<div className={styles.rectangle_actions}></div>
					</div>

					<div className={styles.rectangle}>
						<span>Default Shipping Address</span>
						<p>Get info from user</p>
					</div>
				</div>
			</div>

			<div className={styles.wishlist_block}>
				<div className={styles.title_container}>
					<span>My Wish List</span>
					<Link href={"#"}>Go To Wish List</Link>
				</div>
				<div className={styles.wishlist_items}>
					You have no items in your wish list.
				</div>
			</div>
		</div>
	)


}

