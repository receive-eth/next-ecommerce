module.exports = class UserDto {
    firstName;
    lastName;
    role;
    gender;
    email;
    userId;
    isActivated;

    constructor(model) {
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.role = model.role
        this.gender = model.gender
        this.email = model.email
        this.id = model.userId
        this.isActivated = model.isActivated
    }
}