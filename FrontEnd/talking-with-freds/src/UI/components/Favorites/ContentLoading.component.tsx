import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Container, Header} from 'semantic-ui-react';

class ContentLoadingComponent extends React.Component {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<Container fluid textAlign='center'>
				<Header as='h2' primaryheader='1' style={{padding: '20px 0 30px'}}>
					<FormattedMessage id='general.contentLoading' />
				</Header>
			</Container>
		);
	}
}

export default ContentLoadingComponent;
