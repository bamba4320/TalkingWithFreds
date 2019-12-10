import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Divider, Header, Image, Container} from 'semantic-ui-react';

interface IAboutClientsComponentProps {
	clientStory: string;
	clientImg: string | undefined;
}
interface IAboutClientsComponentState {}

class AboutClientsComponent extends React.Component<IAboutClientsComponentProps, IAboutClientsComponentState> {
	constructor(props: IAboutClientsComponentProps) {
		super(props);
	}

	public render() {
		return (
			<div className='client-main-div'>
				<div className='client-text-area'>
					<Header as='h2' className='client-header'>
						<FormattedMessage id='About.clients' />
					</Header>
					<Divider className='crumb-divider' headerdivider='1' />
					<Container text textAlign='right' className='client-part2-text'>
						{this.props.clientStory}
					</Container>
				</div>
				<Image
					src={this.props.clientImg === undefined ? 'static/placeholders/image-placeholder.png' : this.props.clientImg}
					className='clien-part3-image'
				/>
			</div>
		);
	}
}

export default AboutClientsComponent;
