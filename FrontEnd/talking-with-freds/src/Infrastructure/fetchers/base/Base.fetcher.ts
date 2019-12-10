import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken} from 'axios';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import ErrorUtils from 'common/errorHandling/ErrorUtils';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import EnvConfig from 'Infrastructure/config/env.config';
import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import {NextContext} from 'next';
import {isNullOrUndefined} from 'util';
import {ApiResponse} from './ApiResponse.interface';

const TOKEN_KEY_ON_HEADERS = 'token';
const ORGANIZATION_ID = 'organizationId';

export class BaseFetcher {
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
			if (isNullOrUndefined(config.headers[TOKEN_KEY_ON_HEADERS]) && this.shouldAddTokenToRequest(config)) {
				// Set token from storage
				const tokenFromStorage = NofhonitCookies.getToken();
				if (tokenFromStorage) {
					config.headers[TOKEN_KEY_ON_HEADERS] = tokenFromStorage;
				}
			}

			// Organization Id
			config.headers[ORGANIZATION_ID] = '38';

			// Set withCredentials
			config.withCredentials = true;

			return config;
		});

		// Set interceptor on the response - Always return the "data" from the response
		this.axios.interceptors.response.use((response: AxiosResponse) => {
			const apiResponse: ApiResponse = response.data;

			// is the apiResponse doesn't have "status", we pass the original response
			// TODO: Maybe check that with headers
			if (isNullOrUndefined(apiResponse.status)) {
				return response;
			}

			// Otherwise, we know this is an "ApiError"
			const extractedError: ApiError = ErrorUtils.extractError(apiResponse);
			if (extractedError) {
				throw extractedError;
			}

			if (!isNullOrUndefined(apiResponse.data)) {
				return apiResponse.data;
			} else {
				return apiResponse;
			}
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

	public postFormData(url: string, file: any) {
		const formData = new FormData();
		formData.append('file', file);
		const axiosConfig = this.getBasicAxiosConfig({
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return this.post(url, formData, axiosConfig);
	}

	public uploadFile(url: string, file: any, cancelToken: CancelToken): Promise<any> {
		const formData = new FormData();
		formData.append('file', file);

		const axiosConfig = this.getBasicAxiosConfig({
			cancelToken,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return this.post(url, formData, axiosConfig);
	}

	/**
	 * Check if there is a cookie with `token` in the request
	 * Is so, extract it and return `headers` object with the token
	 * @param ctx NextContext object in order to get the token from cookies
	 * ctx can be undefined because we call this func also in client side
	 */
	protected extractTokenFromNextContextAsHeaders(ctx?: NextContext) {
		const token = NofhonitCookies.getToken(ctx);
		if (token) {
			return {
				[TOKEN_KEY_ON_HEADERS]: token,
			};
		}

		return null;
	}

	/**
	 * This method is for future "thinking".
	 * When we'll need to change the configuration, we can do that in this method
	 * @param config configuration object of Axios
	 */
	private getBasicAxiosConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
		return config || {};
	}

	/**
	 * The server is deployed on "remote machine", so,
	 *
	 * The server should use url like `localhost:XXXX` becuase it's with the API "in the same machine".
	 *
	 * The client should use the _Real_ url of the API such as `api.ofOurSite.com`.
	 */
	private getBaseApiUrl() {
		if (NextjsProcessUtils.isServer()) {
			return EnvConfig.getApiUrlFromServer();
		} else {
			return EnvConfig.getApiUrlFromClient();
		}
	}

	/**
	 * This method decides wether to send the token (from localStorage) in the request
	 * Currently, it's checking:
	 * 1. If the current process is Browser
	 * 2. The url we send the request to
	 * @param config The request object (By Axios)
	 */
	private shouldAddTokenToRequest(config: AxiosRequestConfig) {
		return NextjsProcessUtils.isBrowser() && this.checkAddTokenByRequestUrl(config);
	}

	/**
	 * This suppose to be a blackList of all the url we should NOT send the token to
	 * @param config The request object (By Axios)
	 */
	private checkAddTokenByRequestUrl(config: AxiosRequestConfig) {
		if (config && config.url) {
			return !config.url.includes('users/updatePassword');
		}

		return true;
	}
}
