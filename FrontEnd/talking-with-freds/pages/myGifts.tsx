import {MYGIFTS_STORE} from 'BL/stores';
import MyGiftsStore from 'BL/stores/MyGifts.store';
import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import withAuth from 'NextJsComponents/WithAuth/WithAuth';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import MyGiftsContainer from 'UI/containers/MyGifts/MyGifts.container';

const MyGifts = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'myGifts.MyGifts'})}
				metaDescription={intl.formatMessage({id: 'seo.PageDescription'})}
			/>
			<MyGiftsContainer mobileDetect={props.mobileDetect} />
		</>
	);
};

MyGifts.getInitialProps = async (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];

	const myGiftsStore: MyGiftsStore = mobxStores[MYGIFTS_STORE] as MyGiftsStore;
	await myGiftsStore.init(ctx);
	return {
		mobileDetect,
	};
};

export default withAuth(withIntl(MyGifts));
