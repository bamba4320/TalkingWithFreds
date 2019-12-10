import Lang from 'Infrastructure/Language/Language';
import moment from 'moment';
import * as Yup from 'yup';

const requiredMessage = Lang.format('errors.Required');
const emailMessage = Lang.format('errors.Email');
const notMatchMessage = Lang.format('errors.NotMatch');
const dateMessage = Lang.format('errors.Date');
const birthDateMessage = Lang.format('errors.birthDate');
const phoneMessage = Lang.format('errors.Phone');
const createPasswordValidationMessage = Lang.format('errors.MustContainCharacters');
const nameTooLongMessage = Lang.format('errors.NameTooLong');
const priceMessage = Lang.format('errors.Price');
const numberMessage = Lang.format('errors.Number');
const cardNumberMessage = Lang.format('errors.CardNumber');
const IdMessage = Lang.format('errors.Id');
const EmailOrPhoneMessage = Lang.format('errors.EmailOrPhone');
const CvvMessage = Lang.format('errors.Cvv');
const conditionsMessage = Lang.format('errors.conditions');
const emailRegex = /^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,})|(([a-zA-Z0-9]+[-]+[a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))+$/;
const newsletterRequireMessage = Lang.format('errors.NewsletterRequired');

const emailYup = Yup.string()
	// .email(emailMessage)
	.required(requiredMessage)
	.test('email', emailMessage, (val) => !val || emailRegex.test(val));

const newsletterEmailYup = Yup.string()
	// .email(emailMessage)
	.required(newsletterRequireMessage)
	.test('email', emailMessage, (val) => !val || emailRegex.test(val));

const requiredYup = Yup.string().required(requiredMessage);

const phoneYup = Yup.string()
	.nullable()
	.length(0 || 10, phoneMessage)
	.test('phone', phoneMessage, (val) => !val || /^[0-9]+$/i.test(val));

const birthdateYup = Yup.string().test('birthdate', birthDateMessage, (val: string) => {
	const arr = val ? val.split('/') : [];
	const valMoment =
		arr.length > 0
			? moment({
					year: parseInt(arr[2], 10),
					month: parseInt(arr[1], 10) - 1,
					day: parseInt(arr[0], 10),
			  })
			: moment({year: 0, month: 0, day: 0});
	return (
		!val ||
		// convert dd/mm/yyyy String to Date
		// tslint:disable-next-line: radix
		(valMoment.isBefore(moment(), 'day') && /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i.test(val))
	);
});
const sendDateYup = Yup.string()
	.required(requiredMessage)
	.test('sendDate', dateMessage, (val: string) => {
		const arr = val.split('/');
		const valMoment = moment({
			year: parseInt(arr[2], 10),
			month: parseInt(arr[1], 10) - 1,
			day: parseInt(arr[0], 10),
		});
		return (
			// tslint:disable-next-line: radix
			valMoment.isSameOrAfter(moment(), 'day') &&
			/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i.test(val)
		);
	});

const nameYup = Yup.string()
	.required(requiredMessage)
	.max(50, nameTooLongMessage);

const phoneRequiredYup = Yup.string()
	.required(requiredMessage)
	.length(10, phoneMessage)
	.test('phone', phoneMessage, (val) => /^[0-9]+$/i.test(val));

const selectYup = Yup.string().required(requiredMessage);

const passwordYup = Yup.string()
	.required(requiredMessage)
	.test('password', createPasswordValidationMessage, (val) =>
		/(?=(?:.*[A-Z].*){1})(?=(?:.*[a-z].*){1})(?=(?:.*[0-9].*){1})/.test(val)
	)
	.min(8, createPasswordValidationMessage)
	.max(14, createPasswordValidationMessage);

const idNumberYup = Yup.string()
	.required(requiredMessage)
	.length(9, IdMessage)
	.test('idNumber', IdMessage, (val) => !val || /^[0-9]+$/i.test(val));

const notMatchValidationYup = (notToMatchFieldName: string, errorMessage: string) => {
	return Yup.string()
		.required(requiredMessage)
		.notOneOf([Yup.ref(notToMatchFieldName), null], errorMessage);
};

const MatchValidationYup = (FielToValidatedName: string) => {
	return Yup.string()
		.required(requiredMessage)
		.oneOf([Yup.ref(FielToValidatedName), null], notMatchMessage);
};

const codeValidationYup = Yup.string()
	.required(requiredMessage)
	.test('code', numberMessage, (val) => /^[0-9]*$/.test(val));

const cvvValidationYup = Yup.string()
	.required(requiredMessage)
	.min(3, CvvMessage)
	.max(4, CvvMessage)
	.test('cvv', numberMessage, (val) => /^[0-9]*$/.test(val));

const cardNumberYup = Yup.string()
	.required(requiredMessage)
	.min(8, requiredMessage)
	.test('cardNumber', cardNumberMessage, (val) => !val || /^[0-9]+$/i.test(val));

const emailOrPhoneYup = Yup.string()
	.required(requiredMessage)
	.test('emailOrPhone', EmailOrPhoneMessage, (val) => {
		if (/^[0-9]+$/i.test(val[0])) {
			return /^[0-9]+$/i.test(val) && val.length === 10;
		}
		return emailRegex.test(val);
	});

const conditionsYup = Yup.boolean().test('conditions', conditionsMessage, (val) => val);
export default class ValidationSchemas {
	public static loginSchema = Yup.object().shape({
		email: emailYup,
		password: passwordYup,
	});

	public static registerSchema = Yup.object().shape({
		email: emailYup,
		password: passwordYup,
		validatePassword: MatchValidationYup('password'),
	});

	public static validatePasswordSchema = Yup.object().shape({
		password: passwordYup,
		validatePassword: MatchValidationYup('password'),
	});

	public static emailValidationSchema = Yup.object().shape({
		email: emailYup,
	});

	public static profileSchema = Yup.object().shape({
		birthday: birthdateYup,
		email: emailYup,
		name: nameYup,
		phone: phoneYup,
	});

	public static contactUsSchema = Yup.object().shape({
		email: emailYup,
		interest: selectYup,
		name: nameYup,
		phone: phoneRequiredYup,
	});

	public static contactUsPageSchema = Yup.object().shape({
		email: emailYup,
		interest: selectYup,
		name: nameYup,
		phone: phoneYup,
	});

	public static addGiftSchema = Yup.object().shape({
		code: codeValidationYup,
	});

	public static paymentSchema = Yup.object().shape({
		cardNumber: cardNumberYup,
		idNumber: idNumberYup,
		validityYearValue: selectYup,
		validityMonthValue: selectYup,
		cvv: cvvValidationYup,
	});

	public static NotLoggedInpaymentSchema = Yup.object().shape({
		cardNumber: cardNumberYup,
		idNumber: idNumberYup,
		validityYearValue: selectYup,
		validityMonthValue: selectYup,
		cvv: cvvValidationYup,
		email: emailYup,
	});

	public static recoverCodeValidationSchema = Yup.object().shape({
		emailOrPhone: emailOrPhoneYup,
	});

	public static newsLetterSchema(isConnected: boolean) {
		return Yup.object().shape({
			email: isConnected ? Yup.string().notRequired() : newsletterEmailYup,
			conditions: conditionsYup,
		});
	}

	public static changePasswordSchema(errorMessage: string) {
		return Yup.object().shape({
			newPassword: passwordYup.concat(notMatchValidationYup('password', errorMessage)),
			password: requiredYup, // doesnt need the password validation
			validatePassword: MatchValidationYup('newPassword'),
		});
	}

	public static priceValidationYup(min: number, max: number) {
		return Yup.string()
			.required(requiredMessage)
			.test(
				'price',
				priceMessage,
				(val) => /^[0-9]*$/.test(val) && parseInt(val, 10) >= min && parseInt(val, 10) <= max
			);
	}

	public static sendGiftSchema(min?: number, max?: number) {
		return Yup.object().shape({
			isEmail: Yup.boolean(),
			isPhone: Yup.boolean(),
			isToMySelf: Yup.boolean(),
			isOpen: Yup.boolean(),
			toMemberMobilePhone: Yup.string().when('isPhone', {
				is: (val) => val,
				then: () => phoneRequiredYup,
				otherwise: () => Yup.string().notRequired(),
			}),
			toMemberEmail: Yup.string().when('isEmail', {
				is: (val) => val,
				then: () => emailYup,
				otherwise: () => Yup.string().notRequired(),
			}),
			toMemberName: Yup.string().when('isToMySelf', {
				is: (val) => !val,
				then: () => nameYup,
				otherwise: () => Yup.string().notRequired(),
			}),
			fromMemberName: Yup.string().when('isToMySelf', {
				is: (val) => !val,
				then: () => nameYup,
				otherwise: () => Yup.string().notRequired(),
			}),
			sumToLoad: Yup.string().when('isOpen', {
				is: (val) => val,
				then: () => this.priceValidationYup(min ? min : 0, max ? max : 0),
				otherwise: () => Yup.string().notRequired(),
			}),
			sendDate: sendDateYup,
		});
	}
}
