/**
 * This class is made
 */
export default class EnvConfig {
	public static getAppEnv() {
		return process.env.APP_ENV;
	}

	public static getNodeEnv() {
		return process.env.NODE_ENV;
	}

	public static getApiUrlFromClient() {
		return process.env.APP_API_URL_CLIENT;
	}

	public static getApiUrlFromServer() {
		return process.env.APP_API_URL_SERVER;
	}

	public static getBuildId() {
		return process.env.BUILD_ID;
	}

	public static getFacebookAppID() {
		return process.env.APP_FACEBOOK_APP_ID;
	}

	public static getGoogleClientID() {
		return process.env.APP_GOOGLE_CLIENT_ID;
	}
}
