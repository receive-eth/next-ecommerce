import { useEffect, useRef } from "react"

export const useClickOutside = (setActive: any) => {
	const ref = useRef<any>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setActive()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			document.body.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return [ref]
}