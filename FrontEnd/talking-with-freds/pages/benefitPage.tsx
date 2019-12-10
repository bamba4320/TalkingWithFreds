import {BENEFIT_STORE, CURRENT_USER_STORE} from 'BL/stores';
import BenefitStore from 'BL/stores/Benefit.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import UserAgentDetecor from 'common/utils/processUtils/UserAgentDetecor';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Header} from 'semantic-ui-react';
import BenefitPageContainer from 'UI/containers/BenefitPage/BenefitPage.container';
import {isNullOrUndefined} from 'util';

const BenefitPage = (initProps: any) => {
	const intl = initProps.intl as InjectedIntl;
	if (initProps.isExist) {
		return (
			<>
				<SeoHeader
					title={intl.formatMessage({id: 'seo.BenefitTitle'}, {name: `${initProps.categoryName}`})}
					metaDescription={intl.formatMessage({id: 'seo.BenefitDescription'}, {name: `${initProps.categoryName}`})}
				/>
				<BenefitPageContainer benefitPageId={initProps.benefitPageId} mobileDetect={initProps.mobileDetect} />
			</>
		);
	} else {
		return (
			<>
				<SeoHeader
					title={intl.formatMessage({id: 'benefitPage.benefitPageNotFound'})}
					metaDescription={intl.formatMessage({id: 'seo.PageDescription'})}
				/>
				<Header as='h1' primaryheader='1' textAlign='center'>
					{intl.formatMessage({id: 'benefitPage.benefitPageNotFound'})}
				</Header>
			</>
		);
	}
};

BenefitPage.getInitialProps = async (context: NextContext) => {
	const mobileDetect = (context as any)[ApplicationPageOptions.mobileDetect];
	const mobxStores = (context as any)[ApplicationPageOptions.mobxStores];

	const benefitStore: BenefitStore = mobxStores[BENEFIT_STORE];
	const benefitPageId = context.query.id;

	const currentUserStore: CurrentUserStore = mobxStores[CURRENT_USER_STORE];
	let isExist: boolean = false;
	// Must use "await" in order to get the benefit in SERVER

	try {
		const isNeedToFetch =
			isNullOrUndefined(benefitStore.getBenefitPage) ||
			!benefitStore.getBenefitPage.categoryName ||
			(benefitPageId && parseInt(benefitPageId.toString(), 10) !== benefitStore.getBenefitPage.categoryId);

		if (isNeedToFetch) {
			await benefitStore.fetchBenefitPage(benefitPageId, !currentUserStore.isNotLoggedIn, context);
		}
		const categoryName: string = benefitStore.getBenefitPage.categoryName;
		isExist = benefitStore.getBenefitPage.categoryName ? true : false;
		return {
			mobileDetect,
			categoryName,
			isExist,
			benefitPageId,
		};
	} catch (e) {
		return {
			isExist,
		};
	}
};

export default withIntl(BenefitPage);
