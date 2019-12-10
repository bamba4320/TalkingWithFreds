import {isNullOrUndefined} from 'util';

// About the typescript error when the prototype chain breaks
// https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
// There is a bug in typescript while transpiling from es6 to es5, when subclassing
// Array, Error the prototype chain breaks, thats why we need to use - Object.setPrototypeOf
// to restore the prototype chain

export interface GeneralErrorOptions {
	errToLog?: Error;
	generalErrorCode?: string;
	generalErrorMessage?: string;
}

export class GeneralError extends Error {
	public message!: string;
	public errToLog?: Error;
	public generalErrorCode?: string;

	constructor(errorMessage: string, options?: GeneralErrorOptions) {
		super(errorMessage);
		// must be called after super
		Object.setPrototypeOf(this, GeneralError.prototype);

		if (!isNullOrUndefined(options)) {
			if (!isNullOrUndefined(options.errToLog)) {
				this.errToLog = options.errToLog;
			}
			if (!isNullOrUndefined(options.generalErrorCode)) {
				this.generalErrorCode = options.generalErrorCode;
			}
		}
	}
}
