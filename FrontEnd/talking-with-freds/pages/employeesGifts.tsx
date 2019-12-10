import {FORWORKERS_STORE} from 'BL/stores';
import ForWorkersStore from 'BL/stores/ForWorkers.store';
import {ContextsNames} from 'common/generalconsts/messages.consts';
import {ApplicationPageOptions, MessagesPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import SmoothScroll from 'NextJsComponents/Styles/SmoothScroll';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import ForWorkersContainer from 'UI/containers/ForWorkers/ForWorkers.container';

const ForWorkers = (initProps: any) => {
	const intl = initProps.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.EmployeeGiftsTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.EmployeeGiftsDescription'})}
			/>
			<SmoothScroll />
			<ForWorkersContainer mobileDetect={initProps.mobileDetect} intl={intl} />
		</>
	);
};

ForWorkers.getInitialProps = async (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];

	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];
	const forWorkersStore: ForWorkersStore = mobxStores[FORWORKERS_STORE];

	await forWorkersStore.fetchSliders();
	await forWorkersStore.fetchTopTag();

	return {
		[MessagesPageOptions.Context]: ContextsNames.EMPLOYEES_GIFTS,
		mobileDetect,
	};
};

export default withIntl(ForWorkers);
