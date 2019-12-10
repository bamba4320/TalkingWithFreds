import MessageDTO from 'common/models/DTOs/Message.dto';

/**
 * Decleration of all messages *Names* that fetched by context
 */
export enum ContextsNames {
	HOME_PAGE = 'Home Page',
	REGULATIONS = 'Regulations',
	ABOUT = 'About',
	SOLUTIONS = 'Solutions',
	GIFT_IMPLEMENTAION = 'Gift Implementaion',
	EMPLOYEES_GIFTS = 'Employee gift',
}

/**
 * Represents the object that holds all the messages of the site in `Messages.store`
 *
 * !!!! When you add a context to the `WebSiteMessages` interface, you have to add the same key to `MessagesContextType`
 */
export interface WebSiteMessages {
	footer: FooterMessages;
	newsletter: NewsletterMessages;
	contact: ContactMessages;
	auth: AuthMessages;
	myGifts: MyGiftsMessages;
	[ContextsNames.HOME_PAGE]?: HomePageMessages;
	[ContextsNames.REGULATIONS]?: TermsMessages;
	[ContextsNames.ABOUT]?: AboutMessages;
	[ContextsNames.SOLUTIONS]?: SolutionsMessages;
	[ContextsNames.GIFT_IMPLEMENTAION]?: ImplementGiftMessages;
	[ContextsNames.EMPLOYEES_GIFTS]?: ForWorkersMessages;
}

/**
 * Base interface for messages by context
 *
 * Any "Messages" interface that we add to `WebSiteMessages`, Should `extends BaseContextMessages`
 *
 * For now, it only holds `contextFetching` that indicates
 * wether the messages for a `context` are fetched or not
 */
export interface BaseContextMessages {
	contextFetching?: ContextFetchingStatus;
	errorMessage?: string;
}

export enum ContextFetchingStatus {
	Fetching = 'Fetching',
	Finished = 'Finished',
	FinishedWithoutMessages = 'FinishedWithoutMessages',
	Errored = 'Errored',
}
/** // * All the contexts of the website */

export interface FooterMessages extends BaseContextMessages {
	category1: MessageDTO;
	category2: MessageDTO;
	category3: MessageDTO;
	category4: MessageDTO;
	category5: MessageDTO;
	notLoggedIn: MessageDTO;
	PCIMessage: MessageDTO;
}

export interface NewsletterMessages extends BaseContextMessages {
	guest: MessageDTO; // messageKey 20010
	terms: MessageDTO; // messageKey 20011
	approved: MessageDTO; // messageKey 20012
	user: MessageDTO; // messageKey 20013
	approved_user: MessageDTO; // messageKey 20014
}

export interface ContactMessages extends BaseContextMessages {
	msgSent: MessageDTO; // messageKey will be delivered soon.
}

export interface AuthMessages extends BaseContextMessages {
	registerVerification: MessageDTO; // messageKey 20054
	updatePassword: MessageDTO; // 20022
	duplicateErrorMessage: MessageDTO; // 10022
}

export interface HomePageMessages extends BaseContextMessages {
	part1_title: MessageDTO;
	part1_text: MessageDTO;
	part1_internal1_pic: MessageDTO;
	part1_m_internal1_pic: MessageDTO;
	part1_internal1_text: MessageDTO;
	part1_internal2_pic: MessageDTO;
	part1_m_internal2_pic: MessageDTO;
	part1_internal2_text: MessageDTO;
	part1_internal3_pic: MessageDTO;
	part1_m_internal3_pic: MessageDTO;
	part1_internal3_text: MessageDTO;
	part2_banner: MessageDTO;
	part3_pic: MessageDTO;
	part3_m_pic: MessageDTO;
	part4_video: MessageDTO;
	part5_internal1_banner: MessageDTO;
	part5_m_internal1_banner: MessageDTO;
	part5_internal1_text: MessageDTO;
	part5_internal2_banner: MessageDTO;
	part5_m_internal2_banner: MessageDTO;
	part5_internal2_text: MessageDTO;
	part6_banner: MessageDTO;
	part6_m_banner: MessageDTO;
}

export interface ForWorkersMessages extends BaseContextMessages {
	part1_title: MessageDTO; // MessageKey: 20067
	part1_internal1_pic: MessageDTO; // MessageKey: 20068
	part1_internal1_text: MessageDTO; // MessageKey: 20069
	part1_internal2_pic: MessageDTO; // MessageKey: 20070
	part1_internal2_text: MessageDTO; // MessageKey: 20071
	part2_banner: MessageDTO; // MessageKey: 20072
	part2m_banner: MessageDTO; // MessageKey 301470
	part3_text: MessageDTO; // MessageKey: 20073
	part4_internal1_text: MessageDTO; // MessageKey: 20061
	part5_internal2_pic: MessageDTO; // MessageKey: 20062
	part4_internal1_pic: MessageDTO; // MessageKey: 301459
	part4_m_internal1_pic: MessageDTO; // MessageKey: 301460
	m_internal1_pic: MessageDTO; // MessageKey: 301460
	part4_internal2_text: MessageDTO; // MessageKey: 20063
	part4_internal2_pic: MessageDTO; // MessageKey: 20064
	part5_m_internal2_pic: MessageDTO; // MessageKey: 301463
	part4_internal3_text: MessageDTO; // MessageKey: 20065
	part4_internal3_pic: MessageDTO; // MessageKey: 20066
	part4_m_internal2_pic: MessageDTO; // MessageKey: 301462
	part5_text: MessageDTO; // MessageKey: 20074
	part5_pic: MessageDTO; // MessageKey: 20075
	part5_m_pic: MessageDTO; // MessageKey: 301474
	part6_internal1_banner: MessageDTO; // MessageKey: 20076
	part6_internal1_text: MessageDTO; // MessageKey: 20082
	part6_internal2_banner: MessageDTO; // MessageKey: 20077
	part6_internal2_text: MessageDTO; // MessageKey: 20083
	upper_part_m_pic_title: MessageDTO; // MessageKey: 301473
}

export interface TermsMessages extends BaseContextMessages {
	Regulations: MessageDTO;
}

export interface MyGiftsMessages extends BaseContextMessages {
	addVoucher: MessageDTO;
	// voucherNotFound: MessageDTO;
}

export interface AboutMessages extends BaseContextMessages {
	part1_text: MessageDTO;
	part1_pic: MessageDTO;
	part1_m_pic: MessageDTO;
	part2_text: MessageDTO;
	part2_pic: MessageDTO;
	part2_pic_mobile: MessageDTO;
	part3_internal1_banner: MessageDTO;
	part5_m_internal2_banner: MessageDTO;
	part5_m_internal1_banner: MessageDTO;
	part3_internal2_banner: MessageDTO;
	part3_internal1_text: MessageDTO;
	part3_internal2_text: MessageDTO;
}

export interface SolutionsMessages extends BaseContextMessages {
	Suppliers: MessageDTO;
}

export interface ImplementGiftMessages extends BaseContextMessages {
	part1_banner: MessageDTO; // messageKey: 3069
	part2_banner: MessageDTO; // messageKey: 3070
	part3_text: MessageDTO; // messageKey: 3071
	part4_text: MessageDTO; // messageKey: 3072
	part1_m_image: MessageDTO;
	part2_m_image: MessageDTO;
	part5_text: MessageDTO;
}
