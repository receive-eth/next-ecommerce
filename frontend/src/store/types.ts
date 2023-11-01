export interface IIState {
	isLoading: boolean
	error: any
	user: any
}

export interface loginCredentials {
	email: string
	password: string
}

export interface registrationCredentials {
	firstName: string
	lastName: string
	gender: string
	email: string
	password: string
}

export interface IUserCart {
	userId: string, 
	productId: string
	sizeId: string
	isAnonimous?: boolean
}

export interface IRemCart {
	userId: string
	productIds: Array<string>
}

export interface IChangeQuantity {
	userId: string,
	productId: string,
}

export interface IToggle {
	userId: string
	cartItemIds: string[]
	isSelected: boolean
}

export interface IDiscountRequest {
	userId: string,
	promocode: string
}

export interface ICustomError {
	status: string,
	errors: unknown[]
}

export interface ApiError {
	data: {},
	message: string,
	errors: []
}

export interface IAnonimousCartResponse {
	userId: string,
	createdAt: string
}

export interface IMergingCart {
	anonimousCartId: string | null
	loggedInUserId: string
}


// Favorites
export interface IFavoritesRequest {
	userId: string,
	productId: string
}

