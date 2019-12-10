import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import * as React from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Container} from 'semantic-ui-react';

const UserUnAuthenticated = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'userUnAuthenticated.title'})}
				metaDescription={intl.formatMessage({id: 'seo.PageDescription'})}
			/>
			<Container fluid>
				<FormattedMessage id='userUnAuthenticated.title' />
			</Container>
		</>
	);
};

export default withIntl(UserUnAuthenticated);
