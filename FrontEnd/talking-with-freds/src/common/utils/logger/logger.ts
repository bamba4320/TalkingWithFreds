import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import EnvConfig from 'Infrastructure/config/env.config';

// tslint:disable: no-console

enum LOG_LEVEL {
	VERBOSE = 'VERBOSE',
	DEBUG = 'DEBUG',
	INFO = 'INFO',
	WARN = 'WARN',
	ERROR = 'ERROR',
	TEST_LOG = 'TEST_LOG',
}

export default class Logger {
	public static verbose(...optionalParams: any[]): void {
		if (NextjsProcessUtils.isBrowser()) {
			console.log(`%c ${LOG_LEVEL.VERBOSE}`, 'color:green', ...optionalParams);
		} else {
			console.log(LOG_LEVEL.VERBOSE, ...optionalParams);
		}
	}

	public static debug(...optionalParams: any[]): void {
		if (NextjsProcessUtils.isBrowser()) {
			console.log(`%c ${LOG_LEVEL.DEBUG}`, 'color:blue', ...optionalParams);
		} else {
			console.log(LOG_LEVEL.DEBUG, ...optionalParams);
		}
	}

	public static info(message?: any, ...optionalParams: any[]): void {
		console.info(message, ...optionalParams);
	}

	public static warn(message?: any, ...optionalParams: any[]): void {
		console.warn(message, ...optionalParams);
	}

	public static error(title: string, error?: any, ...optionalParams: any[]) {
		console.error(title, error, ...optionalParams);
	}

	public static logTest(...optionalParams: any[]) {
		if (EnvConfig.getNodeEnv() === 'test') {
			console.log(LOG_LEVEL.TEST_LOG, optionalParams);
		}
	}
}
