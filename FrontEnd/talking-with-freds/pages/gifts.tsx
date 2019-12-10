import {SEARCH_STORE, UI_STORE} from 'BL/stores';
import SearchStore from 'BL/stores/Search.store';
import UiStore from 'BL/stores/Ui.store';
import {FilterGiftsProps} from 'common/generalconsts/giftFilters.enums';
import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import {routesPaths} from 'common/routes/routesPaths.consts';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import {NextContext} from 'next';
import CanonicalHeader from 'NextJsComponents/CanonicalHeader/CanonicalHeader';
import UserAgentDetecor from 'common/utils/processUtils/UserAgentDetecor';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import MainGiftsContainer from 'UI/containers/GiftsCatgegories/MainGifts.container';

const Gifts = (initProps: any) => {
	const intl = initProps.intl as InjectedIntl;
	return (
		<>
			{initProps[FilterGiftsProps.categoryName] ? (
				<SeoHeader
					title={intl.formatMessage({id: 'seo.GiftsTitle'}, {name: initProps[FilterGiftsProps.categoryName]})}
					metaDescription={intl.formatMessage(
						{id: 'seo.GiftsDescription'},
						{name: initProps[FilterGiftsProps.categoryName]}
					)}
				/>
			) : (
				<SeoHeader
					title={intl.formatMessage({id: 'seo.GiftsDefaultTitle'})}
					metaDescription={intl.formatMessage({id: 'seo.GiftsDefaultDescription'})}
				/>
			)}
			{initProps.host && <CanonicalHeader href={initProps.host + routesPaths.gifts.root} />}
			<MainGiftsContainer
				mobileDetect={initProps.mobileDetect}
				filterdGifts={initProps[FilterGiftsProps.filterdGifts]}
				filters={initProps[FilterGiftsProps.filters]}
				categoryName={initProps[FilterGiftsProps.categoryName]}
				areaFilters={initProps.areaFilters}
				tagsFilters={initProps.tagsFilters}
				shouldLazyLoad={initProps.shouldLazyLoad}
			/>
		</>
	);
};

Gifts.getInitialProps = async (context: NextContext) => {
	/* 
	Saves the ctaegories from api and the filterModel
	in [FilterGiftsProps.filterdGifts] and [FilterGiftsProps.filters]
	so it will pass those to the container.
	*/

	const mobileDetect = (context as any)[ApplicationPageOptions.mobileDetect];
	const mobxStores = (context as any)[ApplicationPageOptions.mobxStores];
	const uiStore: UiStore = mobxStores[UI_STORE];
	const searchStore: SearchStore = mobxStores[SEARCH_STORE];
	const userAgentDetector = (context as any)[ApplicationPageOptions.userAgentDetector] as UserAgentDetecor;
	const shouldLazyLoad = userAgentDetector.shouldLazyLoad();

	const areaFilters = await searchStore.fetchAreaFilterArray();
	const tagsFilters = await searchStore.fetchTagsFilterArray();

	try {
		const filterProps: any = await searchStore.getSearchedCategoriesByFilter(context.query);
		const host = NextjsProcessUtils.isServer()
			? context.req && context.req._parsedUrl._raw !== routesPaths.gifts.root
				? context.req.headers.host
				: ''
			: window.location.pathname !== routesPaths.gifts.root
			? window.location.origin
			: '';
		uiStore.unblockUiSite();
		return {
			[FilterGiftsProps.filterdGifts]: filterProps[FilterGiftsProps.filterdGifts],
			[FilterGiftsProps.filters]: filterProps[FilterGiftsProps.filters],
			[FilterGiftsProps.categoryName]:
				context.query.id && context.query.id !== '0' ? filterProps[FilterGiftsProps.categoryName] : '',
			mobileDetect,
			areaFilters,
			tagsFilters,
			host,
			shouldLazyLoad,
		};
	} catch (e) {
		console.error(e);
	}
};

export default withIntl(Gifts);
