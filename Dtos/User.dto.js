export class UserDto {
	id
	userName
	email
	isAdmin
	constructor(model) {
		this.email = model.email
		this.userName = model.userName
		this.id = model._id
		this.isAdmin = model.isAdmin
	}
}
