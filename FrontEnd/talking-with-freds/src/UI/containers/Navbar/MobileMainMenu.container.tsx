import {isCurrentUrl} from 'common/routes/historyUtils';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import {observer} from 'mobx-react';
import Link from 'next/link';
import {SingletonRouter, withRouter} from 'next/router';
import React, {Component} from 'react';
import {Header, Icon, Menu} from 'semantic-ui-react';

interface IProps {
	router: SingletonRouter;
}
interface IState {}

@observer
class MobileMainMenuContainer extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	public render() {
		const head1 = Lang.format('navbar.Home');
		const head2 = Lang.format('navbar.MyGifts');
		const head4 = Lang.format('navbar.Profile');
		return (
			<Menu fluid borderless inverted pointing secondary navbarmenu='1' widths={3}>
				<Link href={routesPaths.root}>
					<Menu.Item
						navbaritem='1' // less
						navbarmobileitem='1' // less
						name={head1}
						active={this.isItemActive(routesPaths.root)}>
						<Icon name={'home'} mobilemenuitem='1' />
						<Header zeromargintop='1' textAlign='center'>
							<Header.Subheader
								mobilenavbarheader='1'
								mobilenavbarheadernotmarkedcolor={!this.isItemActive(routesPaths.root) ? '1' : null}
								whitesubheader={this.isItemActive(routesPaths.root) ? '1' : null}>
								{head1}
							</Header.Subheader>
						</Header>
					</Menu.Item>
				</Link>
				<Link href={routesPaths.myGifts}>
					<Menu.Item
						navbaritem='1' // less
						navbarmobileitem='1' // less
						name={head2}
						active={this.isItemActive(routesPaths.myGifts)}>
						<Icon name={'gift'} mobilemenuitem='1' />
						<Header zeromargintop='1' textAlign='center'>
							<Header.Subheader
								mobilenavbarheader='1'
								mobilenavbarheadernotmarkedcolor={!this.isItemActive(routesPaths.myGifts) ? '1' : null}
								whitesubheader={this.isItemActive(routesPaths.myGifts) ? '1' : null}>
								{head2}
							</Header.Subheader>
						</Header>
					</Menu.Item>
				</Link>
				<Link href={routesPaths.profile.root}>
					<Menu.Item
						navbaritem='1' // less
						navbarmobileitem='1' // less
						name={head4}
						active={this.isItemActive(routesPaths.profile.root)}>
						<Icon name={'user outline'} mobilemenuitem='1' />
						<Header zeromargintop='1' textAlign='center'>
							<Header.Subheader
								mobilenavbarheader='1'
								mobilenavbarheadernotmarkedcolor={!this.isItemActive(routesPaths.profile.root) ? '1' : null}
								whitesubheader={this.isItemActive(routesPaths.profile.root) ? '1' : null}>
								{head4}
							</Header.Subheader>
						</Header>
					</Menu.Item>
				</Link>
			</Menu>
		);
	}

	private isItemActive(route: string) {
		return isCurrentUrl(this.props.router, route);
	}
}
export default withRouter(MobileMainMenuContainer);
