import {HOMEPAGE_STORE} from 'BL/stores';
import HomePageStore from 'BL/stores/Homepage.store';
import {ContextsNames} from 'common/generalconsts/messages.consts';
import {ApplicationPageOptions, LayoutPageOptions, MessagesPageOptions} from 'common/generalconsts/pageOptions.enums';
import UserAgentDetecor from 'common/utils/processUtils/UserAgentDetecor';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import HomePageContainer from 'UI/containers/HomePage/HomePage.container';

const Index = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.HomeTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.HomeDescription'})}
			/>
			<div>
				<HomePageContainer
					mobileDetect={props.mobileDetect}
					openForgotPassword={props.openForgotPassword}
					shouldLazyLoad={props.shouldLazyLoad}
				/>
			</div>
		</>
	);
};

Index.getInitialProps = async (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	const userAgentDetector = (ctx as any)[ApplicationPageOptions.userAgentDetector] as UserAgentDetecor;
	const shouldLazyLoad = userAgentDetector.shouldLazyLoad();

	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];
	const homePageStore: HomePageStore = mobxStores[HOMEPAGE_STORE];
	const openForgotPassword = ctx.query && ctx.query.invalidRecoverUrl && ctx.query.invalidRecoverUrl === '1';

	await homePageStore.fetchSliders();
	await homePageStore.fetchTopTag();

	return {
		[MessagesPageOptions.Context]: ContextsNames.HOME_PAGE,
		[LayoutPageOptions.withSticky]: true,
		mobileDetect,
		openForgotPassword,
		shouldLazyLoad,
	};
};

export default withIntl(Index);
