export enum LoginCredentials {
	EmailAndPass = 1,
	IdentityAndPassword = 2,
	UserNameAndPass = 3,
	Facebook = 4,
	Google = 5,
}

export enum SignOptions {
	Authenticate = '1',
	Join = '2',
}

export enum PrivateOrBusiness {
	businessTobusiness_consumer = 1,
	businessTobusiness_small = 2,
	businessTobusiness_large = 3,
}

export enum UpdatePasswordOptions {
	New = '1',
	Update = '2',
	Reset = '3',
}
