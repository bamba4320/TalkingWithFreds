import React, {Component, createRef} from 'react';
import {Container, Grid, Header, Icon, Modal} from 'semantic-ui-react';
import './customModal.component.scss';

interface IProps {
	onClose?: any;
	onBack?: any;
	trigger?: any; // the thing that will open the modal-(for example:<Button>Show Modal</Button>)
	headerText?: string | null;
	modalStruct?: any;
	isOpen: boolean;
	isNoMarginFromTop?: boolean;
	isNoPaddingFromTop?: boolean;
	mobileModalOuterContainerStyle?: any | null;
	mobileModalInnerContentContainerStyle?: any | null;
	rightHeader?: boolean;
	widerModal?: boolean;
	fitContent?: boolean;
	noTitle?: boolean;
	isRecoverPassword?: boolean;
}
interface IState {}

export default class CustomModal extends Component<IProps, IState> {
	public contextRef = createRef();

	public render() {
		return (
			<Grid>
				{/* modal for desktop. */}
				<Grid.Column width={16}>
					<Modal
						className={`main-modal-wrapper ${this.props.fitContent ? 'fitcontentmodal' : ''} ${
							this.props.widerModal ? 'widerdesktopmodal' : ''
						} `}
						open={this.props.isOpen}
						onClose={this.props.onClose}
						closeIcon={<Icon className='close-icon' name='x' size='big' onClick={this.props.onClose} />}>
						<Modal.Content>{this.renderModalContent()}</Modal.Content>
					</Modal>
				</Grid.Column>
			</Grid>
		);
	}

	private renderModalContent() {
		return (
			<Container className={`${this.props.isNoPaddingFromTop ? 'paddingbottom75' : ''}`}>
				<div className='modal-header-segment'>
					{/* the text align right is for IE, it doesnt effect other browsers */}
					<Header className='modal-header' as='h1'>
						{this.props.headerText}
					</Header>
				</div>
				<div className='inner-content-wrapper'>{this.props.children}</div>
			</Container>
		);
	}
}
