import Link from "next/link"
import styles from './page.module.css'

export default function NotFound() {
	return (
		<div className={styles.not_found}>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>
		</div>
	)
}