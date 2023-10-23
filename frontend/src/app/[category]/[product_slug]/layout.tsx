import Link from 'next/link'
import styles from './layout.module.css'

const ProductFooter = () => {
    return (
			<div className={styles.wrapper}>
				<div className={styles.description}>
					<span>details & description</span>
				</div>
				<div className={styles.share_social_media}>
					<div className={styles.info_block}>
						<span>share with your friends</span>
					</div>
					<div className={styles.vertical_separator} />
					<div className={styles.info_block}>
						<ul>
							<li>
								<Link href={"#"}>shipping & returns</Link>
							</li>
							<li>
								<Link href={"#"}>payment</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
}


export default function ProductLayout({ children }: any) {
	return (
		<>
			{children}
			<ProductFooter />
		</>
	)
}

