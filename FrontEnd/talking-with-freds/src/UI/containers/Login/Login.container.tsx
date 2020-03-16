import React from 'react';
import CurrentUserStore from '../../../BL/stores/CurrentUserStore.store';
import AuthStore from '../../../BL/stores/Auth.store';
import './Login.container.scss';

interface IProps {
	authStore: AuthStore;
}
interface IState {}

export default class LoginContainer extends React.Component<IProps, IState> {
	public render() {
		return <div />;
	}
}
