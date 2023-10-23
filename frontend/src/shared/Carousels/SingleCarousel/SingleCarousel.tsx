'use client'

import { useState } from 'react'
import styles from './SingleCarousel.module.css'
import { RightArrow, LeftArrow } from '@/components/SVGS'

interface ISingleCarouselProps {
	imageURLS: string[]
}

const SingleCarousel = ({ imageURLS }: ISingleCarouselProps) => {
	const [imageIndex, setImageIndex] = useState<number>(0)

    const showNextImage = () => {
        setImageIndex((index) => {
            if (index === imageURLS.length - 1) return 0
            return index + 1
        })
    }

    const showPrevImage = () => {
        setImageIndex((index) => {
            if (index === 0) return imageURLS.length - 1
            return index - 1
        })
    }

	return (
		<div className={styles.carousel}>
			<div className={styles.img_container}>
				{imageURLS.map((url: string, index) => {
					return (
						<img
							key={url}
							src={url}
							alt=""
							className={styles.img}
							style={{ translate: `${-100 * imageIndex}%` }}
						/>
					)
				})}
			</div>
			<div className={styles.controller}>
				<button className={styles.btn} onClick={showPrevImage}>
					<LeftArrow className={styles.arrows} />
				</button>
				<div className={styles.circles}>
					{imageURLS.map((_, index) => (
						<button
							key={index}
							onClick={() => setImageIndex(index)}
							className={
								index === imageIndex ? styles.current_circle : styles.circle
							}
						/>
					))}
				</div>
				<button className={styles.btn}>
					<RightArrow className={styles.arrows} onClick={showNextImage} />
				</button>
			</div>
		</div>
	)
}

export default SingleCarousel