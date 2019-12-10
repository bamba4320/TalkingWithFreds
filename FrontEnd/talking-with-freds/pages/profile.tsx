import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import withAuth from 'NextJsComponents/WithAuth/WithAuth';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import ProfileContainer from 'UI/containers/Profile/Profile.container';

const Profile = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'general.profile'})}
				metaDescription={intl.formatMessage({id: 'seo.PageDescription'})}
			/>
			<ProfileContainer mobileDetect={props.mobileDetect}/>
		</>
	);
};

Profile.getInitialProps = (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	return {
		mobileDetect,
	};
};

export default withAuth(withIntl(Profile));
