export const areMultipleInArray = (values: any[], array: any[]) => {
	if (values?.length === 0) return false

	const multipleExist = values?.every((value) => {
		return array.includes(value)
	})

	return multipleExist
}
