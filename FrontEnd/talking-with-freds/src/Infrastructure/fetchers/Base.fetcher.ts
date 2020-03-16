import axios from 'axios';

export default class BaseFetcher {
	static baseURL: string = 'http://localhost:4320/api';

	public static async get(url: string) {
		return await axios.get(BaseFetcher.baseURL + url);
	}

	public static async post(url: string, body: any) {
		return await axios.post(BaseFetcher.baseURL + url, body);
	}
}
