import './progressBar.css'
import nProgress from "nprogress"


export const progressBar = nProgress.configure({
	showSpinner: false,
	speed: 1000,
    minimum: 0.1
})