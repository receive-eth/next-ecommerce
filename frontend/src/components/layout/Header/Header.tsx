'use client'

import styles from './header.module.css'
import Link from 'next/link'
import ProfileButton from "../../ProfileButton"
import Breadcrumbs from '../../breadcrumbs/Breadcrumbs'
import { Favorites, Logo, Cart } from "../../SVGS"
import { usePathname } from "next/navigation"

export default function Header () {
	const links = [
		{id: 1, name: 'men', href: '/men'},
		{id: 2, name: 'women', href: '/women'},
		{id: 3, name: 'kids', href: '/kids'},
		{id: 4, name: 'brans', href: '/brans'},
		{id: 5, name: 'new arrivals', href: '/'},
		{id: 6, name: 'comming soon', href: '/'},
		{id: 7, name: 'sale', href: '/'},
		{id: 8, name: 'raffles', href: '/'},
	]
	const pathname = usePathname()

	const handleActiveLinkStyle = (linkName: string) => {
		if (pathname.split('/')[1] === linkName)
			return styles.active_link
	}

	const handleSameLinkClick = async (linkName: string) => {
		if (pathname.split('/')[1] === linkName) {
			const newPath = pathname.includes(linkName) ? `/${linkName}` : `${pathname}/${linkName}`
			window.location.href = `http://localhost:3000${newPath}`
		}
	}

    return (
			<header className={styles.header}>
				<div className={styles.header_top}>
					<nav>
						<ul className={styles.languages}>
							<li>EN</li>
							<li>FR</li>
							<li>RU</li>
						</ul>
					</nav>

					<Link href={"/"}>
						<Logo className={styles.logo} />
					</Link>

					<nav>
						<ul className={styles.icons}>
							<li>
								<ProfileButton />
							</li>
							<li>
								<Link href={"/profile/favorites"}>
									<Favorites className={styles.favorites} />
								</Link>
							</li>
							<li>
								<Link href={"/cart"}>
									<Cart className={styles.cart} />
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className={styles.header_bottom}>
					<nav>
						<ul className={styles.categories}>
							{links.map((link: any) => (
								<li
									key={link.id}
									className={handleActiveLinkStyle(link.name)}
									onClick={() => handleSameLinkClick(link.name)}
								>
									<Link href={link.href !== pathname ? link.href : "#"}>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<input
						className={styles.search}
						placeholder="Search entire store here ;)"
					/>
				</div>
				<Breadcrumbs />
			</header>
		)
}