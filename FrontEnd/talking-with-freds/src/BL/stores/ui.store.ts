import {action, computed, observable} from 'mobx';
import Swal from 'sweetalert2';

export default class UiStore {
	@observable
	private blockRootUi = false;

	@action
	public blockUiSite = () => {
		this.blockRootUi = true;
	};

	@action
	public unblockUiSite = () => {
		this.blockRootUi = false;
    };
    
    /**
	 * open a Swal's loading popup.
	 * swal automatically knows that it needs to close the current popup if another popup is going to be opened.
	 */
	@action
	public showBlockUiLoadingPopUp(message: string = 'Please wait...') {
		return Swal.fire({
			allowEscapeKey: false,
			allowOutsideClick: false,
			text: message,
			onOpen: () => {
				Swal.showLoading();
			},
		});
	}

	@action
	public closeBlockUiLoadingPopUp() {
		return Swal.close();
	}

	@computed
	public get shouldBlockUiSite() {
		return this.blockRootUi;
	}
}
