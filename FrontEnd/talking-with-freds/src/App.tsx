import {observer, Provider} from 'mobx-react';
import React from 'react';
import BlockUi from 'react-block-ui';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Container, Loader} from 'semantic-ui-react';
import './App.scss';
import rootStores from './BL/stores';
import {AUTO_LOGOUT_STORE, CURRENT_USER_STORE, UI_STORE} from './BL/stores/storesKeys';
import LoginContainer from './UI/containers/Login/Login.container';
import MainLobbyContainer from './UI/containers/MainLobby/MainLobby.container';
import MainModalContainer from './UI/containers/MainModal/MainModal.container';
import RegisterContainer from './UI/containers/Register/Register.container';
import RecoverPasswordContainer from './UI/containers/RecoverPassword/RecoverPassword.container';

interface IProps {}
interface IState {
	loading: boolean;
}

const currentUserStore = rootStores[CURRENT_USER_STORE];
const uiStore = rootStores[UI_STORE];
const autoLogoutStore = rootStores[AUTO_LOGOUT_STORE];
@observer
class App extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	public async componentDidMount() {
		await currentUserStore.initUserFromAPI();
		this.setState({loading: false});
		autoLogoutStore.initAutoLogout();
	}

	public render() {
		const shouldBlockUiSite = uiStore.shouldBlockUiSite;

		return (
			<Provider {...rootStores}>
				<BlockUi className={'block-ui-container'} blocking={shouldBlockUiSite}>
					<BrowserRouter>{this.renderRoutes()}</BrowserRouter>
				</BlockUi>
			</Provider>
		);
	}

	private renderRoutes() {
		if (this.state.loading) {
			return (
				<Container>
					<Loader />
				</Container>
			);
		}
		return (
			<div className='App'>
				<MainModalContainer />
				<Switch>
					<Route exact={true} path='/Login'>
						{!currentUserStore.isUserLoggedIn ? <LoginContainer /> : <Redirect to='/MainLobby' />}
					</Route>
					<Route exact={true} path='/MainLobby'>
						{currentUserStore.isUserLoggedIn ? <MainLobbyContainer /> : <Redirect to='/Login' />}
					</Route>
					<Route exact={true} path='/Register'>
						{!currentUserStore.isUserLoggedIn ? <RegisterContainer /> : <Redirect to='/MainLobby' />}
					</Route>
					<Route exact={true} path='/RecoverPassword'>
						{!currentUserStore.isUserLoggedIn ? <RecoverPasswordContainer /> : <Redirect to='/MainLobby' />}
					</Route>
					<Route exact={true} path='/'>
						{currentUserStore.isUserLoggedIn ? <Redirect to='/MainLobby' /> : <Redirect to='/Login' />}
					</Route>
				</Switch>
			</div>
		);
	}
}

export default App;
