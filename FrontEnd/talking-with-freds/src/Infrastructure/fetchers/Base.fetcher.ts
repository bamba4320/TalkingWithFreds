import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import TalkingWithFredsLocalStorage from '../Utils/LocalStorage/TalkingWithFredsLocalStorage';
import {apiBaseUrl} from '../../common/generalConsts';

import { isNullOrUndefined } from 'util';

const TOKEN_HEADER = 'Authorization';

export default class BaseFetcher {
	public axios: AxiosInstance;

	constructor(baseRoute: string, fetcherBaseURL?: string) {
		let baseApiUrl = fetcherBaseURL ? fetcherBaseURL : this.getBaseApiUrl();
		baseApiUrl += `/${baseRoute}`;
		this.axios = axios.create({
			baseURL: baseApiUrl,
		});

		// Set interceptor on the request
		this.axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
			// Check if there is NOT token on the headers
			// Also checks if this request should have token
			if (isNullOrUndefined(config.headers[TOKEN_HEADER])) {
				// Set token from storage
				const tokenFromStorage = await TalkingWithFredsLocalStorage.getTokenFromLocalStorage();
				if (tokenFromStorage) {
					config.headers[TOKEN_HEADER] = 'Bearer ' + tokenFromStorage;
				}
			}
			return config;
		});

		// Set interceptor on the response - Always return the "data" from the response
		this.axios.interceptors.response.use((response: AxiosResponse) => {
			return response.data;
		});
	}

	public get<V>(url: string, headers?: any): Promise<any> {
		return this.axios.get<any, V>(url, this.getBasicAxiosConfig({headers}));
	}

	public post<V>(url: string, body?: any, headers?: any): Promise<any> {
		return this.axios.post<any, V>(url, body, this.getBasicAxiosConfig({headers}));
	}

	public put(url: string, body?: any, headers?: any): Promise<any> {
		return this.axios.put(url, body, this.getBasicAxiosConfig({headers}));
	}

	public del(url: string, headers?: any): Promise<any> {
		return this.axios.delete(url, this.getBasicAxiosConfig({headers}));
	}

	/**
	 * This method is for future "thinking".
	 * When we'll need to change the configuration, we can do that in this method
	 * @param config configuration object of Axios
	 */
	private getBasicAxiosConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
		return config || {};
	}

	private getBaseApiUrl() {
		return apiBaseUrl;
	}
}
