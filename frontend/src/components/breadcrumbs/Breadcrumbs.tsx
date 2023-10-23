"use client"

import Link from 'next/link'
import styles from './Breadcrumbs.module.css'
import { usePathname } from "next/navigation"
import { capitalize } from '@/utils/Formats'

const Breadcrumbs = () => {

    const path = usePathname()

    const handleBreadcrumbsPosition = () => {
        if (path.split('/').filter(crumb => crumb !== '').length >= 2) {
            return styles.crumbs_wrapper_left
        }
        return styles.crumbs_wrapper_middle
    }

    const handleBreadcrumbsStyles = (crumb: string) => {
        const array = path.split('/').filter((el: string) => el !== '')
        if (array[array.length - 1] == crumb)
            return styles.crumb_no_underline
        else 
            return styles.crumb
    }

    const formatProductName = (string: string) => {
        const newString = string.split('-').map((string: string) => {
            return capitalize(string)
        })
        // delete article from string
        if (newString.length > 1)
            newString[newString.length - 1] = ""
        return newString.join(' ')
    }

    let currentLink = ``

    const crumbs = path.split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, i, array) => {
            currentLink += `/${crumb}`
            return (
                <div key={crumb} className={handleBreadcrumbsStyles(crumb)}>
                    {i === 0 && <span className={styles.separator}>{'>'}</span>}
                    <Link href={currentLink}>{formatProductName(crumb)}</Link>
                    <span className={styles.separator}>{i !== array.length - 1 ? '>' : ''}</span>
                </div>
            )
        })

    return (
			<div className={handleBreadcrumbsPosition()}>
				<div className={styles.crumb}>
                    <Link href={'/'}>Home</Link>
                </div>
				{crumbs}
			</div>
		)
}

export default Breadcrumbs