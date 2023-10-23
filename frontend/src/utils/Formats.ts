export const capitalize = (string: any):string => {
    return String(string[0]).toUpperCase() + string.substring(1)
}

export const encodeProductSlug = (productName: string, productArticle: string) => {
	let prevLetter: string
	const newString = Array.from(productName).map((letter) => {
		const regex = new RegExp(/[a-z,0-9]/gi)
		if (regex.test(letter)) {
			if (prevLetter === "-") {
				prevLetter = letter
				return letter
			}
			return letter
		}

		if (!regex.test(letter)) {
			if (prevLetter === "-") {
				prevLetter = ""
				return ""
			}
			prevLetter = "-"
			return "-"
		}
	})
	const encodedResult = newString.join("")
	
	if (encodedResult[encodedResult.length - 1] === '-') 
		return encodedResult + productArticle

	return encodedResult + '-' + productArticle
}

export const decodeProductSlug = (string: string) => {
    const newString = Array.from(string).map((letter) => {
        if (letter === "-") return " "
		return capitalize(letter)
    })
	const decodedResult = newString.join("").toLowerCase()
	console.log('DECODED RESULT', decodedResult)
	return decodedResult
}

export const formatDB = (string: string) => {
	const decoded = decodeProductSlug(string)
	return decoded.replace(/ /gi, "-")
}