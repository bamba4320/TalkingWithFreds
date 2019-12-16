import React from 'react';
import {AUTH_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import {inject} from 'mobx-react';

interface IProps {
	mobileDetect: MobileDetect;
	[AUTH_STORE]?: AuthStore;
}

interface IState {}

@inject(AUTH_STORE)
export default class LoginContainer extends React.Component<IProps, IState> {
	private mobileDetect: MobileDetect;
	private authStore: AuthStore;
	constructor(props: IProps) {
		super(props);
		this.mobileDetect = this.props.mobileDetect;
		this.authStore = this.props[AUTH_STORE] as AuthStore;
	}

	public render() {
		return <div />;
	}
}
