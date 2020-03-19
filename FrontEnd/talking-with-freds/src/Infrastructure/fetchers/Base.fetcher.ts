import axios from 'axios';
import TalkingWithFredsLocalStorage from '../Utils/LocalStorage/TalkingWithFredsLocalStorage';

export default class BaseFetcher {
	static baseURL: string = 'http://localhost:4320/api';

	public static async get(url: string) {
		const token = await TalkingWithFredsLocalStorage.getTokenFromLocalStorage();
		const authHeader = {
			Authorization: token ? 'Bearer ' + token : 'undefined',
		};
		return await axios.get(BaseFetcher.baseURL + url, {headers: authHeader});
	}

	public static async post(url: string, body: any) {
		const token = await TalkingWithFredsLocalStorage.getTokenFromLocalStorage();
		const authHeader = {
			Authorization: token ? 'Bearer ' + token : 'undefined',
		};
		return await axios.post(BaseFetcher.baseURL + url, body, {headers: authHeader});
	}
}
