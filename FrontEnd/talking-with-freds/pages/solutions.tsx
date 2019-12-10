import {CONTACT_STORE, MESSAGES_STORE} from 'BL/stores';
import ContactUsStore from 'BL/stores/ContactUs.store';
import MessagesStore from 'BL/stores/Messages.store';
import {ContextsNames} from 'common/generalconsts/messages.consts';
import {ApplicationPageOptions, MessagesPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import SolutionsContainer from 'UI/containers/Solutions/solutions.container';

const Solutions = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.SolutionsTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.SolutionsDescription'})}
			/>
			<SolutionsContainer mobileDetect={props.mobileDetect} />
		</>
	);
};

Solutions.getInitialProps = (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];

	const messageStore = mobxStores[MESSAGES_STORE] as MessagesStore;
	const contactStore = mobxStores[CONTACT_STORE] as ContactUsStore;

	return {
		[MessagesPageOptions.Context]: ContextsNames.SOLUTIONS,
		mobileDetect,
		messageStore,
		contactStore,
	};
};
export default withIntl(Solutions);
