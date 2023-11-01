'use client'

import ContentLoader from '@/components/preloaders/ContentLoader/ContentLoader'
import styles from './page.module.css'
import { useAuth } from '@/hooks/useAuth'
import { useFavorites } from '@/hooks/useFavorites'
import Link from 'next/link'
import { useEffect } from 'react'
import { useActions } from '@/hooks/useActions'
import DefaultProduct from '@/shared/Product/Default/DefaultListItem'

export default function Profile() {
	
	const { user } = useAuth()
	const { getUserFavorites } = useActions()
	const { products, isLoading } = useFavorites()

	useEffect(() => {
		getUserFavorites(user?.id)
	}, [])

	if (isLoading) return <ContentLoader />

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
					<Link href={"/profile/favorites"}>Go To Favorites</Link>
				</div>

				{products?.length === 0 ? (
					<div className={styles.wishlist_items}>
						You have no items in your wish list.
					</div>
				) : (
					<div className={styles.products_wrapper}>
						{products?.map((item, index) => (
							<DefaultProduct
								key={index}
								productId={item.productId}
								name={item.name}
								brand={item.brand}
								color={item.color}
								size={item.size}
								price={item.price}
								images={item.images}
								slug={item.slug}
								category={item.category}
								settings={{
									showBrand: true,
									showPrice: true,
									withMenu: true,
									isNameWrappedWithLink: true,
								}}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)


}

