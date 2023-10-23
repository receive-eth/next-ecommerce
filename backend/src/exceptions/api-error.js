module.exports = class ApiError extends Error {
	status
	errors

	constructor(status, message, errors = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	// Статические функции можно вызывать без создания экземпляра класса
	static UnathorizedError() {
		return new ApiError(401, "Пользователь не авторизован")
	}

	static AccessDenied() {
		return new ApiError(401, "У вас нет доступа к этой странице")
	}

	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors)
	}
}