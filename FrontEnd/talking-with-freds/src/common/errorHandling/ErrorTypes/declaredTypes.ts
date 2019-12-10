import {ErrorDescription} from './ErrorDescription';
import {ErrorHTML} from './ErrorHTML';
import {GeneralError} from './GeneralError';

export declare type ApiError = Error | ErrorHTML | ErrorDescription | GeneralError | null;
export declare type ApiMessageError = ErrorHTML | ErrorDescription;
