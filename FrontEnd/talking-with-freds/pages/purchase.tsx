import {PURCHASE_STORE} from 'BL/stores';
import PurchaseStore from 'BL/stores/Purchase.store';
import {ApplicationPageOptions, LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import {routesPaths} from 'common/routes/routesPaths.consts';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import {NextContext} from 'next';
import Router from 'next/router';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import MainPurchaseContainer from 'UI/containers/SendGifts/MainPurchase.container';

const Purchase = (initProps: any) => {
	const intl = initProps.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'general.purchase'})}
				metaDescription={intl.formatMessage({id: 'seo.PageDescription'})}
			/>
			<MainPurchaseContainer mobileDetect={initProps.mobileDetect} />
		</>
	);
};

Purchase.getInitialProps = async (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	const benefitPageId = ctx.query.id;
	const fromCookies = NofhonitCookies.getPurchase(ctx);

	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];
	const purchaseStore: PurchaseStore = mobxStores[PURCHASE_STORE];

	// if there is no information from cookies we need to move to homePage or BenefitPage
	if (!fromCookies || !purchaseStore.getCategory.categoryId) {
		// if we have categoryId in the query we need to move to BenefitPage, else to home page
		if (benefitPageId) {
			if (NextjsProcessUtils.isServer() && ctx.req && ctx.res) {
				ctx.res.writeHead(302, {Location: `${routesPaths.giftPage.root}/${benefitPageId}`});
				ctx.res.end();
			} else {
				Router.push(
					{pathname: routesPaths.giftPage.root, query: {benefitPageId}},
					`${routesPaths.giftPage.root}/${benefitPageId}`
				);
			}
		} else {
			if (NextjsProcessUtils.isServer() && ctx.req && ctx.res) {
				ctx.res.writeHead(302, {Location: routesPaths.root});
				ctx.res.end();
			} else {
				Router.push(routesPaths.root);
			}
		}
	} else {
		await purchaseStore.fetchBlessings();
		await purchaseStore.fetchBlessingMedia();
		await purchaseStore.fetchTopTag();
		return {
			mobileDetect,
			[LayoutPageOptions.withoutHeader]: true,
			[LayoutPageOptions.withoutFooter]: true,
		};
	}
};

export default withIntl(Purchase);
