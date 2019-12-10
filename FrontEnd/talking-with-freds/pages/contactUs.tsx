import {CONTACT_STORE} from 'BL/stores';
import ContactUsStore from 'BL/stores/ContactUs.store';
import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import ContactUsContainer from 'UI/containers/ContactUs/ContactUs.container';

const ContactUs = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.ContactUsTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.ContactUsDescription'})}
			/>
			<ContactUsContainer />
		</>
	);
};

ContactUs.getInitialProps = async (ctx: NextContext) => {
	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];

	const contsctUsStore = mobxStores[CONTACT_STORE] as ContactUsStore;
	await contsctUsStore.init();
	return {};
};
export default withIntl(ContactUs);
