import {CONTACT_STORE} from 'BL/stores';
import ContactUsStore from 'BL/stores/ContactUs.store';
import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import SmoothScroll from 'NextJsComponents/Styles/SmoothScroll';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import CommonQuestionsContainer from 'UI/containers/CommonQuestions/CommonQuestions.container';

const CommonQuestions = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SmoothScroll />
			<SeoHeader
				title={intl.formatMessage({id: 'seo.FaqTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.FaqDescription'})}
			/>
			<CommonQuestionsContainer mobileDetect={props.mobileDetect} />
		</>
	);
};

CommonQuestions.getInitialProps = async (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];

	const contactStore: ContactUsStore = mobxStores[CONTACT_STORE] as ContactUsStore;

	await contactStore.getFAQ();

	return {
		mobileDetect,
	};
};

export default withIntl(CommonQuestions);
