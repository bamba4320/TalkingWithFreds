import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import {CookieAttributes, get as jsCookieGet, remove as jsCookieRemove, set as jsCookieSet} from 'js-cookie';
import {NextContext} from 'next';
import nextCookies from 'next-cookies';
import nookies from 'nookies';

enum CookiesKeys {
	userToken = 'userToken',
}

class TalkingWithFredsCookies {
	/**
	 * Saves the token of the user in cookies
	 * The token should be saved
	 * otherwise, saves it in sessionStorage
	 * @param token The token to save
	 * @param rememberMe Whether to save the token in localStorage or sessionStorage
	 */
	public saveToken(token: string, rememberMe: boolean = true) {
		if (rememberMe) {
			this.setCookie(CookiesKeys.userToken, token, {expires: 9999});
		} else {
			// In case of rememberMe = false, the cookie is saved for the current session only
			this.setCookie(CookiesKeys.userToken, token);
		}

		return token;
	}

	/**
	 * Get the token of the user from cookies
	 *
	 * - If the token is saved for the current session
	 *
	 * 	(e.g. if saveToken was called with `rememberMe = false`),
	 *
	 * 	the token saved in `session` cookie
	 *
	 * - If the token is saved with `rememberMe = true`,
	 *
	 * 	the token expiration day is in 30 *years*...
	 */
	public getToken(ctx?: NextContext): string | null {
		const token = this.getCookie(CookiesKeys.userToken, ctx);
		if (token && token.length > 0) {
			return token;
		}

		return null;
	}

	/**
	 * Clear the token from cookies
	 * This Should happen only in browser
	 */
	public clearTokens(ctx?: NextContext) {
		this.removeCookie(CookiesKeys.userToken, ctx);
	}

	public getCookie(name: string, ctx?: NextContext) {
		if (NextjsProcessUtils.isBrowser()) {
			return jsCookieGet(name);
		} else if (NextjsProcessUtils.isServer() && ctx) {
			const cookies = nextCookies(ctx);
			if (cookies && cookies[name]) {
				return cookies[name];
			}
		}

		return null;
	}

	/**
	 * ! Works for browser only
	 * Set a cookie on the browser
	 * @param name cookie name
	 * @param value value of the cookie
	 * @param options options from js-cookie library
	 */
	private setCookie(name: string, value: string, options?: CookieAttributes) {
		if (NextjsProcessUtils.isBrowser()) {
			return jsCookieSet(name, value, options);
		}

		return null;
	}

	private removeCookie(name: string, ctx?: NextContext) {
		if (NextjsProcessUtils.isBrowser()) {
			return jsCookieRemove(name);
		} else if (NextjsProcessUtils.isServer() && ctx) {
			nookies.destroy(ctx, CookiesKeys.userToken);
		}

		return null;
	}
}

export default new TalkingWithFredsCookies();
