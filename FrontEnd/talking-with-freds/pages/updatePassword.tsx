import {LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import ResetPasswordContainer from 'UI/containers/ResetPassword/ResetPassword.container';

const ResetPassword = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'general.UpdatePassword'})}
				metaDescription={intl.formatMessage({id: 'seo.PageDescription'})}
			/>
			<ResetPasswordContainer />
		</>
	);
};

ResetPassword.getInitialProps = async (ctx: NextContext) => {
	return {
		[LayoutPageOptions.withoutFooter]: true,
		[LayoutPageOptions.withoutHeader]: true,
	};
};

export default withIntl(ResetPassword);
