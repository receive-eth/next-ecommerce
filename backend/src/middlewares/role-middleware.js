const ApiError = require("../exceptions/api-error")

module.exports = function(allowedRolesList) {
    return function(req, res, next) {
            const decodedUserData = req.user
            const rolesArray = [...allowedRolesList]
            const result = rolesArray.includes(decodedUserData.role)

            if (!result) return next(ApiError.AccessDenied())
            next()
    }
}