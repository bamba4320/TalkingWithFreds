export default class TalkingWithFredsLocalStorage {
	// local storage keys
	private static fields = {
		token: 'token',
	};

	/**
	 * clear all local storage fields.
	 */
	public static clearAll() {
		localStorage.clear();
	}

	/**
	 * get field value from local storage
	 */
	public static async getTokenFromLocalStorage() {
		return new Promise((resolve, reject) => {
			try {
				// get the token value from the local storage
				// two options: string, or null.
				const token = localStorage.getItem(this.fields.token);
				// if token is string or null, we can work with it
				if (typeof token !== 'undefined') {
					resolve(token);
				} else {
					// if token is undefined, there was a problem...
					reject(new Error('token is undefind'));
				}
			} catch (err) {
				throw new Error(err.message);
			}
		});
	}

	/**
	 * If exists, set the token field value to the given value
	 * else, add new field.
	 * @param {string} token
	 */
	public static setTokenToLocalStorage(token: string) {
		return new Promise((resolve, reject) => {
			try {
				localStorage.setItem(this.fields.token, token);
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}
}
