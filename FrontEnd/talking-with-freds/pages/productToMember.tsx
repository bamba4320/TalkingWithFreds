import {CURRENT_USER_STORE, PURCHASE_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import {ApplicationPageOptions, LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import {routesPaths} from 'common/routes/routesPaths.consts';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import {NextContext} from 'next';
import Router from 'next/router';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import MainProductToMemberContainer from 'UI/containers/ProductToMember/MainProductToMember.container';

const ProductToMember = (initProps: any) => {
	const intl = initProps.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={initProps.categoryName as string}
				metaDescription={intl.formatMessage({id: 'seo.PageDescription'})}
			/>
			<MainProductToMemberContainer
				mobileDetect={initProps.mobileDetect}
				orderGuid={initProps.orderGuid}
				withAnimation={initProps.withAnimation}
			/>
		</>
	);
};

ProductToMember.getInitialProps = async (context: NextContext) => {
	const mobileDetect = (context as any)[ApplicationPageOptions.mobileDetect];
	const mobxStores = (context as any)[ApplicationPageOptions.mobxStores];
	const orderGuid: string = context.query.id as string;
	const withAnimation: boolean = (context.query.withAnimation as string) === 'true';
	const purchaseStore: PurchaseStore = mobxStores[PURCHASE_STORE];
	const currentUserStore: CurrentUserStore = mobxStores[CURRENT_USER_STORE];

	if (!orderGuid) {
		if (NextjsProcessUtils.isServer() && context.req && context.res) {
			if (currentUserStore.isNotLoggedIn) {
				context.res.writeHead(302, {Location: routesPaths.root});
			} else {
				context.res.writeHead(302, {Location: routesPaths.gifts.root});
			}
			context.res.end();
		} else {
			Router.push(routesPaths.root);
		}
	} else {
		const categoryName: string = purchaseStore.getProductToMember.category.categoryName;
		return {mobileDetect, [LayoutPageOptions.withoutHeader]: true, orderGuid, categoryName, withAnimation};
	}
};

export default withIntl(ProductToMember);
