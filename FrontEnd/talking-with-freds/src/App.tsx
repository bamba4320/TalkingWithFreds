import {observer, Provider} from 'mobx-react';
import React from 'react';
import BlockUi from 'react-block-ui';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.scss';
import rootStores from './BL/stores';
import {CURRENT_USER_STORE, UI_STORE} from './BL/stores/storesKeys';
import TalkingWithFredsLocalStorage from './Infrastructure/Utils/LocalStorage/TalkingWithFredsLocalStorage';
import LoginContainer from './UI/containers/Login/Login.container';
import MainLobbyContainer from './UI/containers/MainLobby/MainLobby.container';
import MainModalContainer from './UI/containers/MainModal/MainModal.container';
import RegisterContainer from './UI/containers/Register/Register.container';

interface IProps {}
interface IState {}

const currentUserStore = rootStores[CURRENT_USER_STORE];
const uiStore = rootStores[UI_STORE];
@observer
class App extends React.Component<IProps, IState> {
	
	public componentDidMount() {
		TalkingWithFredsLocalStorage.getTokenFromLocalStorage()
			.then((token) => {
				if (token) {
					currentUserStore.initUserFromAPI();
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	public render() {
		const shouldBlockUiSite = uiStore.shouldBlockUiSite;
		return (
			<Provider {...rootStores}>
				<BlockUi className={'block-ui-container'} blocking={shouldBlockUiSite}>
					<BrowserRouter>
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
									{!currentUserStore.isUserLoggedIn ? <RegisterContainer/> : <Redirect to='/MainLobby'/> }
								</Route>
								<Route exact={true} path='/'>
									{currentUserStore.isUserLoggedIn ? <Redirect to='/MainLobby' /> : <Redirect to='/Login' />}
								</Route>
							</Switch>
						</div>
					</BrowserRouter>
				</BlockUi>
			</Provider>
		);
	}
}

export default App;
