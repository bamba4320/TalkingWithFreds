import MessageDTO from 'common/models/DTOs/Message.dto';
import {InjectedIntl} from 'react-intl';
import Swal, {SweetAlertType} from 'sweetalert2';
import {ApiError} from './ErrorTypes/declaredTypes';
import {ErrorDescription} from './ErrorTypes/ErrorDescription';
import {ErrorHTML} from './ErrorTypes/ErrorHTML';
import {GeneralError} from './ErrorTypes/GeneralError';
import ErrorUtils from './ErrorUtils';
import Lang from 'Infrastructure/Language/Language';
const buttonsStyle = {
	cancelButtonColor: '#fff',
	confirmButtonColor: '#992a84',
};

export default class AlertUtils {
	public static async showInformationalPopUp(message: string, allowOutsideClick?: boolean) {
		return Swal.fire({
			allowOutsideClick: allowOutsideClick ? true : false,
			html: message,
			type: 'info',
			confirmButtonText: Lang.format('alertUtils.confirmText'),
			showConfirmButton: true,
			confirmButtonClass: 'regular-button',
			...buttonsStyle,
		});
	}

	public static async showGeneralSuccessPopUp(message: string, allowOutsideClick?: boolean, onAfterPopUpClose?: any) {
		return Swal.fire({
			allowOutsideClick: allowOutsideClick ? true : false,
			html: message,
			type: 'success',
			onAfterClose: onAfterPopUpClose ? onAfterPopUpClose() : null,
			confirmButtonText: Lang.format('alertUtils.confirmText'),
			showConfirmButton: true,
			confirmButtonClass: 'regular-button',
			...buttonsStyle,
		});
	}

	public static async showGeneralErrorPopUp(
		message: string,
		allowOutsideClick?: boolean,
		showCancelButton?: boolean,
		onAfterPopUpClose?: any
	) {
		return Swal.fire({
			allowOutsideClick: allowOutsideClick ? true : false,
			html: message,
			type: 'error',
			showCancelButton: showCancelButton ? true : false,
			onAfterClose: onAfterPopUpClose ? onAfterPopUpClose() : null,
			confirmButtonText: Lang.format('alertUtils.confirmText'),
			showConfirmButton: true,
			confirmButtonClass: 'regular-button',
			...buttonsStyle,
		});
	}

	/**
	 *
	 * @param messageDTO MessageDTO to show to the user
	 * @param type
	 */
	public static async showMessageSuccessPopUp(messageDTO?: MessageDTO, type: SweetAlertType = 'success') {
		return Swal.fire({
			allowOutsideClick: false,
			html: messageDTO ? messageDTO.messageText : '',
			type,
			confirmButtonText: Lang.format('alertUtils.confirmText'),
			showConfirmButton: true,
			confirmButtonClass: 'regular-button',
			...buttonsStyle,
		});
	}

	/**
	 * Checking
	 * @param err contains the error message coming from the server
	 * @param title extra title string for showing title (optionally)
	 */
	public static async checkApiErrorAndShowPopUp(
		err: ApiError,
		title?: string,
		allowOutsideClick?: boolean,
		onAfterPopUpClose?: any
	) {
		if (ErrorUtils.isHTMLError(err)) {
			const htmlError = err as ErrorHTML;

			return Swal.fire({
				allowOutsideClick: allowOutsideClick ? true : false,
				onAfterClose: onAfterPopUpClose ? onAfterPopUpClose : null,
				type: 'error',
				title,
				html: htmlError.message,
				confirmButtonText: Lang.format('alertUtils.confirmText'),
				showConfirmButton: true,
				confirmButtonClass: 'regular-button',
				...buttonsStyle,
			});
		} else if (ErrorUtils.isDescriptionError(err)) {
			const descriptionError = err as ErrorDescription;

			return Swal.fire({
				allowOutsideClick: allowOutsideClick ? true : false,
				onAfterClose: onAfterPopUpClose ? onAfterPopUpClose : null,
				type: 'error',
				title,
				text: descriptionError.message,
				confirmButtonText: Lang.format('alertUtils.confirmText'),
				showConfirmButton: true,
				confirmButtonClass: 'regular-button',
				...buttonsStyle,
			});
		} else if (ErrorUtils.isGeneralError(err)) {
			const generalError = err as GeneralError;

			return Swal.fire({
				allowOutsideClick: allowOutsideClick ? true : false,
				onAfterClose: onAfterPopUpClose ? onAfterPopUpClose : null,
				type: 'error',
				title,
				text: generalError.message,
				footer: generalError.generalErrorCode
					? `${Lang.format('alertUtils.ErrorCode')}: ${generalError.generalErrorCode}`
					: '',
				confirmButtonText: Lang.format('alertUtils.confirmText'),
				showConfirmButton: true,
				confirmButtonClass: 'regular-button',
				...buttonsStyle,
			});
		} else {
			return Swal.fire({
				allowOutsideClick: allowOutsideClick ? true : false,
				onAfterClose: onAfterPopUpClose ? onAfterPopUpClose : null,
				type: 'error',
				title,
				text: Lang.format('alertUtils.generalError'),
				confirmButtonText: Lang.format('alertUtils.confirmText'),
				showConfirmButton: true,
				confirmButtonClass: 'regular-button',
				...buttonsStyle,
			});
		}
	}

	public static async showConfirmationPopup(messageDTO?: MessageDTO) {
		return Swal.fire({
			allowOutsideClick: false,
			html: messageDTO ? messageDTO.messageText : '',
			showCancelButton: true,
			cancelButtonText: Lang.format('alertUtils.cancelText'),
			confirmButtonText: Lang.format('alertUtils.confirmText'),
			showConfirmButton: true,
			cancelButtonClass: 'inverted-button',
			confirmButtonClass: 'regular-button',
			...buttonsStyle,
		});
	}
}
