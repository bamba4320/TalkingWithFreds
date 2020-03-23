import {observer} from 'mobx-react';
import React, {Component} from 'react';
import rootStores from '../../../BL/stores';
import { MODAL_STORE } from '../../../BL/stores/storesKeys';
import CustomModal from '../../components/CustomModal/customModal.component';


interface IMainModalContainerProps {}

interface IMainModalContainerState {}

const modalStore = rootStores[MODAL_STORE];

@observer
export default class MainModalContainer extends Component<IMainModalContainerProps, IMainModalContainerState> {
	constructor(props: IMainModalContainerProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div>{this.modalElement()}</div>;
	}

	private modalElement = () => {
		return (
			<CustomModal
				headerText={modalStore.lastModalItemHeaderText}
				modalStruct={modalStore.lastModalItemStruct}
				isOpen={modalStore.modalIsOpen}
				mobileModalOuterContainerStyle={modalStore.lastModalItemOuterContainerAdjustedStyle}
				mobileModalInnerContentContainerStyle={modalStore.lastModalItemInnerContentContainerAdjustedStyle}
				isNoPaddingFromTop={modalStore.getlastModalItemIsNoPaddingFromTop}
				rightHeader={modalStore.getlastModalItemIsRightHeader}
				widerModal={modalStore.getlastModalItemIsWiderModal}
				fitContent={modalStore.getLastModalItemIsFitContent}
				noTitle={modalStore.getNoTitle}
				isRecoverPassword={modalStore.getIsRecoverPassword}
				// when clicking on the close icon.
				onClose={() => {
					modalStore.getOnCloseAction && modalStore.getOnCloseAction();
					modalStore.closeModal();
				}}
				// when clicking on the back icon.
				onBack={() => {
					modalStore.popModal();
				}}>
				{/* the opened modal. */}
				{modalStore.lastModalItemStruct}
			</CustomModal>
		);
	};
}
