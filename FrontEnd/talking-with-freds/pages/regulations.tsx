import {ContextsNames} from 'common/generalconsts/messages.consts';
import {ApplicationPageOptions, MessagesPageOptions} from 'common/generalconsts/pageOptions.enums';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import TermsContainer from 'UI/containers/Terms/terms.container';

const TermsPage = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.RegulationsTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.RegulationsDescription'})}
			/>
			<TermsContainer mobileDetect={props.mobileDetect} />
		</>
	);
};

TermsPage.getInitialProps = async (ctx: any) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];

	return {
		mobileDetect,
		[MessagesPageOptions.Context]: ContextsNames.REGULATIONS,
	};
};
export default withIntl(TermsPage);
