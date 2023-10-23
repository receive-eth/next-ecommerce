import axios from "axios";

export const API_URL = process.env.API_URL

const $api = axios.create({
	withCredentials: true, // для куки файлов
	baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

$api.interceptors.response.use((config) => {
	return config;
}, async (error) => {
    if (error.response.status === 401) {
        try {
            const originalRequest = error.config
            const response = await axios.get(`${process.env.API_URL}/user/refresh`, {withCredentials: true}) 
            localStorage.setItem("accessToken", response.data.accessToken)
            return $api.request(originalRequest)
        } catch(e) {
            console.log('Не авторизован')
        }
    }
})


export default $api