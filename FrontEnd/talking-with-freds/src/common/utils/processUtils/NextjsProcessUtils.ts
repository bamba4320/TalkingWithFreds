import {NextAppContext} from 'next/app';

export default class NextjsProcessUtils {
	public static isServer() {
		const isServer = !(process as any).browser;
		return isServer;
	}

	public static isBrowser() {
		const isBrowser = (process as any).browser;
		return isBrowser;
	}

	public static isErrorPage(appContext: NextAppContext) {
		return appContext.router.route === '/_error';
	}
}
