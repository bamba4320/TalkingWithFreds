import ContactUsConverter from 'common/models/converters/ContactUs.converter';
import FaqConverter from 'common/models/converters/Faq.convertor';
import ContactUsDTO from 'common/models/DTOs/ContactUs.dto';
import FAQArrayDTO from 'common/models/DTOs/Faq.dto';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import ContactUsFetcher from 'Infrastructure/fetchers/ContactUs.fetcher';
import MediaFetcher from 'Infrastructure/fetchers/Media.fetcher';
import {action, IObservableArray, observable} from 'mobx';

export default class ContactUsStore {
	@observable public contactUsOptions: IObservableArray<OptionsDTO> = observable([]);

	@observable public FaqArray: IObservableArray<FAQArrayDTO> = observable([]);

	constructor(contactStoreInitialData?: ContactUsStore) {
		if (contactStoreInitialData) {
			this.contactUsOptions.replace(contactStoreInitialData.contactUsOptions);
			this.FaqArray.replace(contactStoreInitialData.FaqArray);
		}
	}

	@action
	public async handleContact(contactDto: ContactUsDTO, context: string) {
		try {
			const response = await ContactUsFetcher.contact(contactDto, context);
			return response;
		} catch (err) {
			throw err;
		}
	}

	@action
	public init = async () => {
		try {
			await this.getOptions();
		} catch (err) {}
	};
	@action
	public getOptions = async () => {
		await ContactUsFetcher.getCrmTypes().then((array) => {
			this.contactUsOptions.replace(ContactUsConverter.ArrayToOptionDto(array));
		});
	};

	@action
	public async getFAQ() {
		try {
			await MediaFetcher.getFAQ().then((array) => {
				this.FaqArray.replace(FaqConverter.ArrayToFaq(array));
			});
		} catch (err) {}
	}
}
