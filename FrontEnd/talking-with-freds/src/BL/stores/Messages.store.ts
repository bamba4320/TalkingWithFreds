import {BaseContextMessages, ContextFetchingStatus, WebSiteMessages} from 'common/generalconsts/messages.consts';
import MessageDTO from 'common/models/DTOs/Message.dto';
import Logger from 'common/utils/logger/logger';
import MediaFetcher from 'Infrastructure/fetchers/Media.fetcher';
import {observable} from 'mobx';
import {isNullOrUndefined} from 'util';
import ConfigurationStore from './Configuration.store';
import Lang from 'Infrastructure/Language/Language';

export default class MessagesStore {
	@observable public webSiteMessages: WebSiteMessages;

	private configurationStore: ConfigurationStore;

	constructor(configurationStore: ConfigurationStore, messagesStoreInitialData?: MessagesStore) {
		this.webSiteMessages =
			messagesStoreInitialData && messagesStoreInitialData.webSiteMessages
				? messagesStoreInitialData.webSiteMessages
				: this.getDefaultWebSiteMessages();

		this.configurationStore = configurationStore;
	}

	public async loadMessagesFromConfiguration(isServer: boolean) {
		try {
			if (isServer) {
				// Get messages from API
				const messages: MessageDTO[] = await MediaFetcher.GetMessagesByKeyList(
					this.configurationStore.configuration.messagesKeys
				);
				if (messages.length > 0) {
					const initialMessagesForWebsite: WebSiteMessages = {
						footer: {
							category1: messages[5],
							category2: messages[6],
							category3: messages[7],
							category4: messages[8],
							category5: messages[9],
							notLoggedIn: messages[10],
							PCIMessage: messages[11],
						},
						newsletter: {
							guest: messages[0],
							terms: messages[1],
							user: messages[3],
							approved_user: messages[4],
							approved: messages[2],
						},
						contact: {
							msgSent: messages[15],
						},
						auth: {
							registerVerification: messages[13],
							updatePassword: messages[16],
							duplicateErrorMessage: messages[17],
						},
						myGifts: {
							addVoucher: messages[14],
						},
					};

					Object.assign(this.webSiteMessages, initialMessagesForWebsite);
				}
			}
		} catch (err) {
			// Logger.error('error occurd in loadMessagesFromConfiguration', err);
		}
	}

	/**
	 * This method is fetching the messages by a context
	 * @param context context to load
	 */
	public async loadMessagesByContext(context: string) {
		const messagesForContext: BaseContextMessages = (this.webSiteMessages as any)[context] as BaseContextMessages;

		// Check if there are already cached messages for the relevant context
		if (messagesForContext && messagesForContext.contextFetching) {
			if (
				messagesForContext.contextFetching === ContextFetchingStatus.Fetching ||
				messagesForContext.contextFetching === ContextFetchingStatus.Finished
			) {
				return;
			}
		}

		if (isNullOrUndefined(messagesForContext)) {
			// indicate that the website is fetching the context's messages
			((this.webSiteMessages as any)[context] as BaseContextMessages) = {
				contextFetching: ContextFetchingStatus.Fetching,
			};

			try {
				// Get messages from API
				const contextMessages: MessageDTO[] = await MediaFetcher.GetMessagesByContext(context);

				// In case the "contextMessages" object has returned without messages,
				// Update the current webSiteMessages with status "FinishedWithoutMessages" and exits from the function
				if (contextMessages.length <= 0) {
					((this.webSiteMessages as any)[context] as BaseContextMessages) = {
						contextFetching: ContextFetchingStatus.FinishedWithoutMessages,
					};
					return;
				}

				// Convert to our object
				const reducedMessages = this.convertToMessagesContext(contextMessages);

				// indicate that the website is finished fetching the context's messages
				((this.webSiteMessages as any)[context] as BaseContextMessages) = {
					contextFetching: ContextFetchingStatus.Finished,
					...reducedMessages,
				};
				return contextMessages;
			} catch (error) {
				Logger.error('Error in getting messages by context', error, context);
				// Error object could not be passed with nextjs, so we pass the message
				const errorMessage = (error && error.message) || '';

				// In case the "contextMessages" object has NOT return, update the current webSiteMessages with status error
				((this.webSiteMessages as any)[context] as BaseContextMessages) = {
					contextFetching: ContextFetchingStatus.Errored,
					errorMessage,
				};
			}
		}

		// return empty array if messages couldn't be fetched
		return [];
	}

	private convertToMessagesContext(messagesDto: MessageDTO[]) {
		return messagesDto
			.filter((messageDTO: MessageDTO) => {
				return messageDTO && messageDTO.messageName;
			})
			.map((messageDTO: MessageDTO) => {
				const key = (messageDTO.messageName as string)
					.split('.')
					.join('_')
					.split('-')
					.join('_');
				return {
					[key]: messageDTO,
				};
			})
			.reduce((accumulator: any, currentValue: MessageDTO) => {
				return {
					...currentValue,
					...accumulator,
				};
			}, {});
	}

	private getDefaultWebSiteMessages(): WebSiteMessages {
		return {
			footer: {
				category1: {messageText: `${Lang.format('messageStore.category')} 1`},
				category2: {messageText: `${Lang.format('messageStore.category')} 2`},
				category3: {messageText: `${Lang.format('messageStore.category')} 3`},
				category4: {messageText: `${Lang.format('messageStore.category')} 4`},
				category5: {messageText: `${Lang.format('messageStore.category')} 5`},
				notLoggedIn: {messageText: Lang.format('messageStore.notConnected')},
				PCIMessage: {messageText: Lang.format('messageStore.PCIRegulation')},
			},
			newsletter: {
				guest: {messageText: 'newsletter.guest'},
				terms: {messageText: 'newsletter.terms'},
				user: {messageText: 'newsletter.user'},
				approved_user: {messageText: 'newsletter.approved_user'},
				approved: {messageText: 'newsletter.approved'},
			},
			contact: {
				msgSent: {messageText: 'NO SUCCESS MESSAGE'},
			},
			auth: {
				registerVerification: {messageText: 'NO REGISTER VERIFICATION MESSAGE'},
				updatePassword: {messageText: Lang.format('login.UpdateReqiure')},
				duplicateErrorMessage: {messageText: Lang.format('errors.duplicatedPassword')},
			},
			myGifts: {addVoucher: new MessageDTO()},
		};
	}
}
