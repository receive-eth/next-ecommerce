const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')

module.exports = function(req, res, next) {
    try {
			const authorizationHeader = req.headers.authorization

			if (!authorizationHeader) {
				return next(ApiError.UnathorizedError())
			}

			// в req.headers.authorization содержится строковая запись, разделенная пробелом "Bearer LehmQcd77IehQe...".
			// с помощью split метода мы эту строку разделяем на 2 слова
			// получаем массив из 2х элементов: [ Bearer (i = 0) и LehmQcd77IehQe (i = 1) ]
            // в итоге достаем токен по индексу из массива
			const accessToken = authorizationHeader.split(" ")[1]
            
            if (!accessToken) {
                return next(ApiError.UnathorizedError())
            }

            const userData = tokenService.validateAccessToken(accessToken)

            if (!userData) {
                return next(ApiError.UnathorizedError())
            }

            req.user = userData
            next()

		} catch(e) {
        return next(ApiError.UnathorizedError())
    }
}