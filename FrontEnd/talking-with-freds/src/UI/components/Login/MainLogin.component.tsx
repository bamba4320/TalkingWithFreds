import Lang from 'Infrastructure/Language/Language';
import React, {Component} from 'react';
import {Button, Grid, Header, Icon, Segment} from 'semantic-ui-react';
import FacebookLoginContainer from 'UI/containers/LogIn/FacebookLogin.container';
import GoogleLoginContainer from 'UI/containers/LogIn/GoogleLogin.container';
import LoginWithEmailContainer from 'UI/containers/LogIn/LoginWithEmail.container';
import RegisterContainer from 'UI/containers/Register/Register.container';

interface IProps {
	openModal?: any;
	closeModal?: any;
	fromPurchase?: boolean;
}
interface IState {}
export default class MainLoginComponent extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<div>
				{/* Register */}
				<Segment placeholder paddingbottom45='1' marginauto='1'>
					<Header as='h2' className='center aligned'>
						<Header.Subheader size='small' primaryheader='1' className='center aligned'>
							{Lang.format('login.LoginToContinueToPay')}
						</Header.Subheader>
						<Button
							content={Lang.format('login.FirstTime')}
							linkbutton='1'
							whitebackground='1'
							mainloginlink='1'
							onClick={() => {
								this.props.openModal(<RegisterContainer fromPurchase={this.props.fromPurchase} />, {
									title: 'register.RegisterWithEmail',
								});
							}}
						/>
					</Header>
				</Segment>
				<Grid className='center aligned'>
					{/* Facebook login */}
					<Grid.Row smallerspacebetweenrows='1'>
						<FacebookLoginContainer fromPurchase={this.props.fromPurchase} />
					</Grid.Row>
					{/* Google login */}
					<Grid.Row smallerspacebetweenrows='1'>
						<GoogleLoginContainer fromPurchase={this.props.fromPurchase} />
					</Grid.Row>
					{/* Basic login */}
					<Grid.Row smallerspacebetweenrows='1'>
						<Button
							onClick={() => {
								this.props.openModal(<LoginWithEmailContainer fromPurchase={this.props.fromPurchase} />, {
									title: 'login.LoginWithEmail2',
								});
							}}
							fluid
							circular
							mainloginbutton='1'
							primarybutton='1'>
							<Icon name='mail' marginleft5='1' />
							{Lang.format('login.LoginWithEmail2')}
						</Button>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}
