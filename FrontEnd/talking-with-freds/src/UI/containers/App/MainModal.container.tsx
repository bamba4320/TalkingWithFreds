import {MODAL_STORE} from 'BL/stores';
import ModalStore from 'BL/stores/Modal.store';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import CustomModal from 'UI/components/custom/customModal/customModal';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import {Width} from 'common/generalconsts/width.const';

interface IMainModalContainerProps {
	[MODAL_STORE]?: ModalStore;
	mobileDetect: MobileDetect;
}

interface IMainModalContainerState {}

@inject(MODAL_STORE)
@observer
export default class MainModalContainer extends Component<IMainModalContainerProps, IMainModalContainerState> {
	private modalStore: ModalStore;

	constructor(props: IMainModalContainerProps) {
		super(props);
		this.state = {};
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={this.modalElement()}
				mobileComponent={this.mobileModalElementWrapper()}
			/>
		);
	}

	private mobileModalElementWrapper = () => {
		return (
			<>
				{/* This is for making the page behind the modal unscrolable */}
				{this.modalStore.modalIsOpen && (
					<style>
						{`
							body {
								position: fixed;
							}
						`}
					</style>
				)}
				{this.modalElement()}
			</>
		);
	};

	private fixScrollingPositionAfterClose = () => {
		if (!NextjsProcessUtils.isServer() && window && window.innerWidth < Width.mobile) {
			window.scrollTo({top: this.modalStore.getLastScrollTopPosition});
		}
	};

	private modalElement = () => {
		this.fixScrollingPositionAfterClose();
		return (
			<CustomModal
				headerText={this.modalStore.lastModalItemHeaderText}
				modalStruct={this.modalStore.lastModalItemStruct}
				isMobileFullScreen={this.modalStore.lastModalItemIsMobileFullScreen}
				isOpen={this.modalStore.modalIsOpen}
				mobileModalOuterContainerStyle={this.modalStore.lastModalItemOuterContainerAdjustedStyle}
				mobileModalInnerContentContainerStyle={this.modalStore.lastModalItemInnerContentContainerAdjustedStyle}
				isMainLoginModal={this.modalStore.isMainLoginModal}
				isNoMarginFromTop={this.modalStore.getlastModalItemIsNoMarginFromTop}
				isNoPaddingFromTop={this.modalStore.getlastModalItemIsNoPaddingFromTop}
				rightHeader={this.modalStore.getlastModalItemIsRightHeader}
				widerModal={this.modalStore.getlastModalItemIsWiderModal}
				fitContent={this.modalStore.getLastModalItemIsFitContent}
				noTitle={this.modalStore.getNoTitle}
				isRecoverPassword={this.modalStore.getIsRecoverPassword}
				// when clicking on the close icon.
				onClose={() => {
					this.modalStore.getOnCloseAction && this.modalStore.getOnCloseAction();
					this.modalStore.closeModal();
				}}
				// when clicking on the back icon.
				onBack={() => {
					this.modalStore.popModal();
				}}>
				{/* the opened modal. */}
				{this.modalStore.lastModalItemStruct}
			</CustomModal>
		);
	};
}
