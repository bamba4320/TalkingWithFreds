import {MESSAGES_STORE} from 'BL/stores';
import MessagesStore from 'BL/stores/Messages.store';
import {ContextsNames} from 'common/generalconsts/messages.consts';
import {ApplicationPageOptions, MessagesPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import AboutContainer from 'UI/containers/About/about.container';

const About = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.AboutTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.AboutDescription'})}
			/>
			<AboutContainer mobileDetect={props.mobileDetect} messageStore={props.messageStore} />
		</>
	);
};

About.getInitialProps = (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];

	const messageStore = mobxStores[MESSAGES_STORE] as MessagesStore;

	return {
		[MessagesPageOptions.Context]: ContextsNames.ABOUT,
		mobileDetect,
		messageStore,
	};
};
export default withIntl(About);
