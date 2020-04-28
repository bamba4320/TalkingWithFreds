import Swal from 'sweetalert2';
import {swalTextConst} from '../../../common/generalConsts';
import './AlertUtils.scss';

export default class AlertUtils {
	public static async showInformationalPopUp(message: string, allowOutsideClick?: boolean) {
		return Swal.fire({
			allowOutsideClick: allowOutsideClick ? true : false,
			html: message,
			icon: 'info',
			showConfirmButton: true,
			confirmButtonText: swalTextConst.confirm,
			customClass: {confirmButton: 'regular-button'},
		});
	}

	public static async showGeneralSuccessPopUp(message: string, allowOutsideClick?: boolean, onAfterPopUpClose?: any) {
		return Swal.fire({
			allowOutsideClick: allowOutsideClick ? true : false,
			html: message,
			icon: 'success',
			showConfirmButton: true,
			confirmButtonText: swalTextConst.confirm,
			customClass: {confirmButton: 'regular-button'},
			onAfterClose: onAfterPopUpClose,
		});
	}

	public static async showGeneralErrorPopUp(message: string, allowOutsideClick?: boolean, onAfterPopUpClose?: any) {
		return Swal.fire({
			allowOutsideClick: allowOutsideClick ? true : false,
			html: message,
			icon: 'error',
			showConfirmButton: true,
			confirmButtonText: swalTextConst.confirm,
			customClass: {confirmButton: 'regular-button'},
			onAfterClose: onAfterPopUpClose,
		});
	}

	public static async showConfirmationPopup(message?: string) {
		return Swal.fire({
			html: message,
			icon: 'question',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: swalTextConst.confirm,
			customClass: {confirmButton: 'regular-button', cancelButton: 'inverted-button'},
		});
	}

	public static async showGeneralWarningPopup(message?: string) {
		return Swal.fire({
			html: message,
			icon: 'question',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: swalTextConst.confirm,
			customClass: {confirmButton: 'regular-button', cancelButton: 'inverted-button'},
		});
	}
}
