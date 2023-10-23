"use client"

import styles from './Pagination.module.css'
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { PaginationArrow } from '../SVGS'
import { useEffect, useState } from 'react'

const Pagination = ({ hasNextPage, hasPrevPage, totalPages }: any) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const page = searchParams.get("page") ?? "1"
	const [inputValue, setInputValue] = useState(page)

	useEffect(() => {
		setInputValue(page)
	}, [page])

	return (
			<div className={styles.pagination_wrapper}>
				<button
					disabled={!hasPrevPage}
					onClick={() => router.push(`/products/?page=${Number(page) - 1}`)}
				>
					<PaginationArrow
						style={{ transform: "scaleX(-1)" }}
						className={styles.arrow}
					/>
				</button>

				<div className={styles.middle_block}>
					<input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<span>/ {totalPages}</span>
				</div>

				<button
					disabled={!hasNextPage}
					onClick={() => router.push(`/products/?page=${Number(page) + 1}`)}
				>
					<PaginationArrow className={styles.arrow} />
				</button>
			</div>
	)
}

export default Pagination
