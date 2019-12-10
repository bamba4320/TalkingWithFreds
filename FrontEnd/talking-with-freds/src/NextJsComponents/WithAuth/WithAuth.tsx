import {routesPaths} from 'common/routes/routesPaths.consts';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import {NextComponentClass, NextContext} from 'next';
import Router from 'next/router';
import * as React from 'react';

export interface IWithAuthProps {}

export interface IWithAuthState {}

export default function withAuth(WrappedComponent: NextComponentClass & any) {
	return class ReactComponentWithAuth extends React.Component<IWithAuthProps, IWithAuthState> {
		public static async getInitialProps(ctx: NextContext) {
			const token = ReactComponentWithAuth.auth(ctx);

			const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

			return {...componentProps, token};
		}
		private static auth(ctx: NextContext) {
			const token = NofhonitCookies.getToken(ctx);

			/*
			 * If `ctx.req` is available it means we are on the server.
			 * Additionally if there's no token it means the user is not logged in.
			 */
			if (NextjsProcessUtils.isServer() && ctx.req && ctx.res && !token) {
				ctx.res.writeHead(302, {Location: routesPaths.userUnAuthenticated});
				ctx.res.end();
			}

			// We already checked for server. This should only happen on client.
			if (!token) {
				Router.replace(routesPaths.userUnAuthenticated);
			}

			return token;
		}

		public render() {
			return <WrappedComponent {...this.props} />;
		}
	};
}
