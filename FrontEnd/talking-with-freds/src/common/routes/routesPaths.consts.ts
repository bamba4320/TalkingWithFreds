const loginRoot = '/login';
const contactUsRoot = '/contactUs';
const profileRoot = '/profile';
const changePassword = '/changePassword';

// add favorites route
const favorites = '/favorites';

export const routesPaths = {
	root: '/',
	login: {
		root: loginRoot,
		changePassword,
	},
	contactUs: {
		root: contactUsRoot,
	},
	profile: {
		root: profileRoot,
	},
	gifts: {
		root: '/gifts',
	},
	favorites: {
		root: favorites,
	},
	giftPage: {
		root: '/benefitPage',
	},
	purchase: {
		root: '/purchase',
	},
	productToMember: {
		root: '/productToMember',
	},
	howToUse: '/howToUse',
	userUnAuthenticated: '/userUnAuthenticated',
	updatePassword: '/updatePassword',
	giftImplementaion: '/giftImplementaion',
	regulations: '/regulations',
	employeesGifts: '/employeesGifts',
	faq: '/faq',
	myGifts: '/myGifts',
	solutions: '/solutions',
	about: '/about',
};
