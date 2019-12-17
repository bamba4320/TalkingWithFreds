import {AUTH_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import NextContext from 'next';
import React from 'react';
import LoginContainer from 'UI/containers/Login/Login.container';

const Login = (props: any) => {
	<LoginContainer mobileDetect={props.mobileDetect} />;
};

Login.getInitialProps = async (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];
	const authStore = mobxStores[AUTH_STORE] as AuthStore;
	return {
		mobileDetect,
		authStore,
	};
};

export default Login;
