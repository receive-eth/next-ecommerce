'use client'
import { usePathname } from "next/navigation"
import styles from './layout.module.css'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActions } from "@/hooks/useActions"

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { logout, checkAnonimousCart } = useActions()
	const pathname = usePathname()
	const router = useRouter()

	const handleLogout = async () => {
		try {
			await logout()
			const anonimousCartId = localStorage.getItem("__anonimous_cart_id")
			await checkAnonimousCart(String(anonimousCartId))
			router.push("/")
		} catch(e) {
			console.log(e)
		}
	}

	const profileSidebarLinks = [
		{ name: "Account information", href: "/profile" },
		{ name: "My addresses", href: "/profile/addresses" },
		{ name: "My orders", href: "/profile/orders" },
		{ name: "My Raffles", href: "/profile/raffles" },
		{ name: "Loyality points", href: "/profile/loyality" },
		{ name: "Newsletter subscriptions", href: "/profile/newsletter" },
		{ name: "Sign out", href: "#", action: handleLogout },
	]

	return (
			<div className={styles.profile_container}>
				<ul className={styles.profile_sidebar}>
					{profileSidebarLinks.map((link) => {
						const isActive = pathname === link.href

						return (
							<li
								key={link.name}
								className={
									isActive ? styles.active_link : styles.inactive_link
								}
							>
								<Link href={link.href} onClick={link.action}>{link.name}</Link>
							</li>
						)
					})}
				</ul>
				<div className={styles.profile_main}>{children}</div>
			</div>
	)
}
