import styles from './page.module.css'
import DefaultProduct from '@/shared/ListItems/Default/DefaultListItem'
import { FakeProduct } from '@/shared/ListItems/Default/FakeData'

const {name, brand, images, category, color, price, slug} = FakeProduct[0]

export default async function Home() {
	return (
		<div className={styles.products_wrapper}>
			<DefaultProduct
				name={name}
				brand={brand}
				category={category}
				color={color}
				price={price}
				images={images}
				slug={slug}
			/>
			<DefaultProduct
				name={name}
				brand={brand}
				category={category}
				color={color}
				price={price}
				images={images}
				slug={slug}
			/>
		</div>
	)
}
