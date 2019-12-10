// About the typescript error when the prototype chain breaks
// https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
// There is a bug in typescript while transpiling from es6 to es5, when subclassing
// Array, Error the prototype chain breaks, thats why we need to use - Object.setPrototypeOf
// to restore the prototype chain

export class ErrorDescription extends Error {
	constructor(message: string) {
		super(message);
		// must be called after super
		Object.setPrototypeOf(this, ErrorDescription.prototype);
	}
}
