import {action, computed, IObservableArray, observable} from 'mobx';

export const MODAL_HASHTAG = '#modal';

export class ModalItem {
	// tslint:disable: variable-name
	private modalHeaderText = '';
	private modalStruct = null;
	private isMobileFullScreen = false;
	private closeFromOutside = true;
	private adjustModalOuterContainerStyle = null;
	private adjustModalInnerContentContainerStyle = null;
	private isNoMarginFromTop?: boolean;
	private isNoPaddingFromTop?: boolean;
	private rightHeader?: boolean;
	private widerModal?: boolean;
	private fitContent?: boolean;
	private noTitle?: boolean;
	private onCloseAction?: () => void;
	private isRecoverPassword?: boolean;

	// tslint:enable: variable-name
	constructor(
		headerText: string,
		modalStruct: any,
		closeFromOutside: boolean,
		adjModalOuterContainerStyle: any,
		adjModalInnerContentContainerStyle: any,
		isNoMarginFromTop: boolean = false,
		isNoPaddingFromTop: boolean = false,
		rightHeader: boolean = false,
		widerModal: boolean = false,
		fitContent: boolean = false,
		noTitle: boolean = false,
		onCloseAction?: () => void,
		isRecoverPassword?: boolean
	) {
		this.modalHeaderText = headerText;
		this.modalStruct = modalStruct;
		this.closeFromOutside = closeFromOutside;
		this.adjustModalOuterContainerStyle = adjModalOuterContainerStyle;
		this.adjustModalInnerContentContainerStyle = adjModalInnerContentContainerStyle;
		this.isNoMarginFromTop = isNoMarginFromTop;
		this.isNoPaddingFromTop = isNoPaddingFromTop;
		this.rightHeader = rightHeader;
		this.widerModal = widerModal;
		this.fitContent = fitContent;
		this.noTitle = noTitle;
		this.onCloseAction = onCloseAction;
		this.isRecoverPassword = isRecoverPassword ? isRecoverPassword : false;
	}

	@computed
	public get getModalHeaderText() {
		return this.modalHeaderText;
	}

	@computed
	public get getModalStruct() {
		return this.modalStruct;
	}

	@computed
	public get modalIsMobileFullScreen() {
		return this.isMobileFullScreen;
	}

	@computed
	public get modalIsCloseFromOutside() {
		return this.closeFromOutside;
	}

	@computed
	public get ModalOuterContainerAdjStyle() {
		return this.adjustModalOuterContainerStyle;
	}

	@computed
	public get ModalInnerContentContainerAdjStyle() {
		return this.adjustModalInnerContentContainerStyle;
	}

	@computed
	public get getIsNoMarginFromTop() {
		return this.isNoMarginFromTop;
	}

	@computed
	public get getIsNoPaddingFromTop() {
		return this.isNoPaddingFromTop;
	}

	@computed
	public get getIsRightHeader() {
		return this.rightHeader;
	}

	@computed
	public get getIsWiderModal() {
		return this.widerModal;
	}
	@computed
	public get getIsFitContent() {
		return this.fitContent;
	}

	@computed
	public get getNoTitle() {
		return this.noTitle;
	}

	@computed
	public get getOnCloseAction() {
		return this.onCloseAction;
	}

	@computed
	public get getIsRecoverPassword() {
		return this.isRecoverPassword ? this.isRecoverPassword : false;
	}
}

// tslint:disable-next-line: max-classes-per-file
export default class ModalStore {
	// tslint:disable: variable-name
	@observable
	private _modalIsOpen = false;

	@observable
	private _modalStack: IObservableArray<ModalItem> = observable([]);

	@observable
	private lastScrollTopPosition: number = 0;

	@computed
	public get getLastScrollTopPosition() {
		return this.lastScrollTopPosition;
	}

	// function for testing.
	@computed
	public get mapStack() {
		const cpyModalStack = [...this._modalStack];
		return cpyModalStack.map((modalItem) => modalItem.getModalHeaderText);
	}

	@action
	public openModal = (
		component: any,
		options: {
			title?: string;
			closeFromOutsideModal?: boolean;
			isNoMarginFromTop?: boolean;
			isNoPaddingFromTop?: boolean;
			adjustedModalOuterContainerStyle?: any;
			adjustedModalInnerContentContainerStyle?: any;
			rightHeader?: boolean;
			widerModal?: boolean;
			fitContent?: boolean;
			noTitle?: boolean;
			isRecoverPassword?: boolean;
			onCloseAction?: () => void;
		},
	) => {
		const modalItem: ModalItem = new ModalItem(
			options.title || '',
			component,
			options.closeFromOutsideModal !== undefined ? options.closeFromOutsideModal : true,
			options.adjustedModalOuterContainerStyle,
			options.adjustedModalInnerContentContainerStyle,
			options.isNoMarginFromTop ? options.isNoMarginFromTop : false,
			options.isNoPaddingFromTop ? options.isNoPaddingFromTop : false,
			options.rightHeader ? options.rightHeader : false,
			options.widerModal ? options.widerModal : false,
			options.fitContent ? options.fitContent : false,
			options.noTitle ? options.noTitle : false,
			options.onCloseAction,
			options.isRecoverPassword ? options.isRecoverPassword : false
		);
		this._modalIsOpen = true;
		this._modalStack.push(modalItem);
	};

	@action
	public closeModal = (undoBack?: boolean, isBackEvent?: boolean) => {
		setTimeout(() => {
			this._modalIsOpen = false;
			this.cleanStack();
		}, 100);
	};

	@action
	public popModal = () => {
		this._modalStack.pop();
	};

	@action
	public cleanStack = () => {
		this._modalStack.clear();
	};

	@computed
	public get modalIsOpen() {
		return this._modalIsOpen;
	}

	@computed
	public get getLength() {
		return this._modalStack.length;
	}

	@computed
	public get lastModalItem() {
		return this._modalStack[this._modalStack.length - 1] || null;
	}

	@computed
	public get lastModalItemStruct() {
		return this.lastModalItem ? this.lastModalItem.getModalStruct : null;
	}

	@computed
	public get lastModalItemHeaderText() {
		return this.lastModalItem ? this.lastModalItem.getModalHeaderText : null;
	}

	@computed
	public get lastModalItemIsMobileFullScreen() {
		return this.lastModalItem ? this.lastModalItem.modalIsMobileFullScreen : null;
	}

	@computed
	public get lastModalItemOuterContainerAdjustedStyle() {
		return this.lastModalItem ? this.lastModalItem.ModalOuterContainerAdjStyle : null;
	}

	@computed
	public get lastModalItemInnerContentContainerAdjustedStyle() {
		return this.lastModalItem ? this.lastModalItem.ModalInnerContentContainerAdjStyle : null;
	}

	@computed
	public get isMainLoginModal() {
		return this._modalStack.length === 1;
	}

	@computed
	public get getlastModalItemIsNoMarginFromTop() {
		return this.lastModalItem ? this.lastModalItem.getIsNoMarginFromTop : undefined;
	}

	@computed
	public get getlastModalItemIsNoPaddingFromTop() {
		return this.lastModalItem ? this.lastModalItem.getIsNoPaddingFromTop : undefined;
	}

	@computed
	public get getlastModalItemIsRightHeader() {
		return this.lastModalItem ? this.lastModalItem.getIsRightHeader : undefined;
	}

	@computed
	public get getlastModalItemIsWiderModal() {
		return this.lastModalItem ? this.lastModalItem.getIsWiderModal : undefined;
	}
	@computed
	public get getlastModalItemIsFitContentModal() {
		return this.lastModalItem ? this.lastModalItem.getIsFitContent : undefined;
	}
	@computed
	public get getLastModalItemIsFitContent() {
		return this.lastModalItem ? this.lastModalItem.getIsFitContent : undefined;
	}

	@computed
	public get getNoTitle() {
		return this.lastModalItem ? this.lastModalItem.getNoTitle : undefined;
	}

	@computed
	public get getOnCloseAction() {
		return this.lastModalItem ? this.lastModalItem.getOnCloseAction : undefined;
	}

	@computed
	public get getIsRecoverPassword() {
		return this.lastModalItem ? this.lastModalItem.getIsRecoverPassword : undefined;
	}
}
