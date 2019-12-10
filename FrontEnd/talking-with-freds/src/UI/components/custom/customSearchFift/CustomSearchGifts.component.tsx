import {routesPaths} from 'common/routes/routesPaths.consts';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import {Button, Container, Header, Image} from 'semantic-ui-react';

interface IProps {
	title: any;
	description: any;
	isFavoritesDesktop?: boolean;
	intl: InjectedIntl;
	isMobile: boolean;
}

interface IState {}

export default class CustomSearchGifts extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	public render() {
		const intl = this.props.intl as InjectedIntl;
		const extraHeaderClassName: string = this.props.isFavoritesDesktop ? 'favorites-header-desktop' : '';
		return (
			<>
				<Container
					fluid
					className={!this.props.isMobile ? 'custom-empty-main-container' : 'custom-mobile-empty-main-container'}>
					<Image centered circular src='/static/images/presents.svg' className={'gift-image'} />
					<Container textAlign='center' className={this.props.isMobile ? 'mobile-header' : ''}>
						<Header as='h2' primaryheader='1' style={{padding: '20px 0 30px'}} className={`${extraHeaderClassName}`}>
							{this.props.title}
							<Header.Subheader primaryheader='1'>{this.props.description}</Header.Subheader>
						</Header>
					</Container>
					<Link href={routesPaths.gifts.root}>
						<a>
							<Button primary circular className='toGiftsBtn'>
								{intl.formatMessage({id: 'general.SearchBtn'})}
							</Button>
						</a>
					</Link>
				</Container>
			</>
		);
	}
}
