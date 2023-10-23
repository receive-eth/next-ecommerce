import styles from './PageCategoryTitle.module.css'
import { capitalize } from '@/utils/Formats'

const PageCategoryTitle = ({ text, count}: {text: string, count: number}) => {

    return (
			<div className={styles.categoryTitle}>
				<h1>{capitalize(text)}</h1>
				<div>
					<div className={styles.line} />
					<span>{`${count} PRODUCTS`}</span>
					<div className={styles.line} />
				</div>
			</div>
		)
}

export default PageCategoryTitle