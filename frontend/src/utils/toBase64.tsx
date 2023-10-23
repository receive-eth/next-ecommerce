export const toBase64 = (file: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		try {
			const reader = new FileReader()
			reader.readAsDataURL(file)

			reader.onload = () => {
				resolve(reader.result)
			}
			reader.onerror = (error) => {
				reject(error)
			}
		} catch (e: any) {
			console.log(e.message)
		}
	})
}