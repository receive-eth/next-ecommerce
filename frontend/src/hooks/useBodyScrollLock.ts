import { useCallback } from "react"

export const useBodyScrollLock = () => {
	const lockScroll = useCallback(() => {
		document.body.style.overflowY = "hidden"
		document.body.style.height = "100vh"
		document.body.style.paddingRight = "16px"
	}, [])

	const unlockScroll = useCallback(() => {
		document.body.style.overflowY = ""
		document.body.style.height = ""
		document.body.style.paddingRight = ""
	}, [])

	return [lockScroll, unlockScroll]
}
