import ContactUsDTO from 'common/models/DTOs/ContactUs.dto';
import {BaseFetcher} from './base/Base.fetcher';

class ContactUsFetcher extends BaseFetcher {
	public async contact(contactUsDTO: ContactUsDTO, context: string) {
		/*
			three context values:
			1. CRM          - ContactUs page and default
			2. EmployeeGift - ForWorkers page
			3. Suppliers    - Solutions page 
		*/
		const body = {
			inputEmail: contactUsDTO.email,
			description: contactUsDTO.help,
			subject: contactUsDTO.interest,
			crmSubjectId: contactUsDTO.interestID,
			fullName: contactUsDTO.name,
			phoneNumber: contactUsDTO.phone,
			fromContext: context,
		};
		return this.post('/openService', body);
	}

	public getCrmTypes = () => {
		return this.get('/getCrmTypes').catch((_err) => {
			return [];
		});
	};
}

export default new ContactUsFetcher(`contact`);
