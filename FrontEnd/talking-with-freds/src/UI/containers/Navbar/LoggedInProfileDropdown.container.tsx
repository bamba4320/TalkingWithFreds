import {AUTH_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React, {Component} from 'react';
import {Header, Icon, Menu, Popup, Segment} from 'semantic-ui-react';

interface IProps {
	[AUTH_STORE]?: AuthStore;
	memberName: string;
}
interface IState {
	isOpen: boolean;
}

@inject(AUTH_STORE)
@observer
export default class LoggedInProfileDropdownContainer extends Component<IProps, IState> {
	public authStore: AuthStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.state = {
			isOpen: false,
		};
	}

	public render() {
		return (
			<Segment placeholder rowflexsegment='1'>
				{/* <Icon name='bell outline' primaryicon='1' autosize='1' size='big' cursorpointer='1' /> */}
				<Icon
					name='user outline'
					primaryicon='1'
					autosize='1'
					fontsize1p4rem='1'
					cursorpointer='1'
					profilepadding='1'
					onClick={() => {
						if (!this.state.isOpen) {
							this.handleOpen();
						} else {
							this.handleClose();
						}
					}}
				/>
				<Popup
					on='click'
					open={this.state.isOpen}
					onOpen={this.handleOpen}
					onClose={this.handleClose}
					hideOnScroll
					pinned
					trigger={
						<Header nomargin='1' displayflex='1'>
							<Header.Subheader cursorpointer='1' loggedinname='1'>
								{this.props.memberName}
							</Header.Subheader>
						</Header>
					}
					position='bottom center'>
					<Popup.Content>
						<Menu vertical noborder='1'>
							{/* Using <a> for link opening abilities such as ctrl+leftClick */}
							<Link href={routesPaths.profile.root}>
								<a>
									<Menu.Item
										onClick={() => {
											this.handleClose();
										}}>
										{Lang.format('profile.Myprofile')}
									</Menu.Item>
								</a>
							</Link>
							{/* TODO:change url */}
							<Link href={routesPaths.myGifts}>
								<a>
									<Menu.Item
										bordertop='1'
										onClick={() => {
											this.handleClose();
										}}>
										{Lang.format('profile.MyGifts')}
									</Menu.Item>
								</a>
							</Link>
							<Link href={routesPaths.root}>
								<Menu.Item
									onClick={() => {
										this.authStore.logOut();
										this.handleClose();
									}}>
									{Lang.format('profile.LogOut')}
								</Menu.Item>
							</Link>
						</Menu>
					</Popup.Content>
				</Popup>
				<Icon
					name='angle down'
					primaryicon='1'
					autosize='1'
					cursorpointer='1'
					onClick={() => {
						if (!this.state.isOpen) {
							this.handleOpen();
						} else {
							this.handleClose();
						}
					}}
				/>
			</Segment>
		);
	}

	private handleOpen = () => {
		this.setState({isOpen: true});
	};

	private handleClose = () => {
		this.setState({isOpen: false});
	};
}
