import {ContextsNames} from 'common/generalconsts/messages.consts';
import {ApplicationPageOptions, MessagesPageOptions} from 'common/generalconsts/pageOptions.enums';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import ImplementGiftContainer from 'UI/containers/ImplementGift/ImplementGift.Container';

const ImplementGiftPage = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.GiftImplementationTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.GiftImplementationDescription'})}
			/>
			<ImplementGiftContainer mobileDetect={props.mobileDetect} />
		</>
	);
};

ImplementGiftPage.getInitialProps = (ctx: any) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];

	return {
		mobileDetect,
		[MessagesPageOptions.Context]: ContextsNames.GIFT_IMPLEMENTAION,
	};
};
export default withIntl(ImplementGiftPage);
