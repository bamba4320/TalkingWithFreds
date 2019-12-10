import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import SeoContainer from 'UI/containers/HowToUse/Seo.container';

const Seo = (props: {intl: InjectedIntl}) => {
	const intl = props.intl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.PageTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.PageDescription'})}
			/>
			<div style={{padding: '50px'}}>
				<div>this is SEO page</div>
				<SeoContainer />
			</div>
		</>
	);
};

export default withIntl(Seo);
