import {ApiResponse} from 'Infrastructure/fetchers/base/ApiResponse.interface';
import {isNullOrUndefined} from 'util';
import {ApiError} from './ErrorTypes/declaredTypes';
import {ErrorDescription} from './ErrorTypes/ErrorDescription';
import {ErrorHTML} from './ErrorTypes/ErrorHTML';
import {GeneralError} from './ErrorTypes/GeneralError';

export default class ErrorUtils {
	public static extractError(response: ApiResponse) {
		// Detect Error
		if (!isNullOrUndefined(response.status) && !response.status) {
			// return error types
			if (response.errorDescription) {
				return new ErrorDescription(response.errorDescription);
			} else if (response.errorHTML) {
				return new ErrorHTML(response.errorHTML);
			} else if (response.generalErrorCode || response.generalErrorMessage) {
				return new GeneralError('response has "response.generalErrorCode" or "response.generalErrorMessage"', {
					generalErrorCode: response.generalErrorCode,
					generalErrorMessage: response.generalErrorMessage,
				});
			} else {
				return new GeneralError('Cannot find "errorDescription" or "errorHTML" field');
			}
		} else {
			return null;
		}
	}

	public static isGeneralError(error: ApiError) {
		return error instanceof GeneralError;
	}

	public static isHTMLError(error: ApiError) {
		return error instanceof ErrorHTML;
	}

	public static isDescriptionError(error: ApiError) {
		return error instanceof ErrorDescription;
	}
}
