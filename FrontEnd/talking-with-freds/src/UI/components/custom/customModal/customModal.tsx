import {IconType} from 'common/generalconsts/custom.enums';
import React, {Component, createRef, RefObject} from 'react';
import {Container, Grid, Header, Icon, Modal, Segment, Sticky} from 'semantic-ui-react';

interface IProps {
	onClose?: any;
	onBack?: any;
	isMobileFullScreen?: boolean | null;
	trigger?: any; // the thing that will open the modal-(for example:<Button>Show Modal</Button>)
	headerText?: string | null;
	modalStruct?: any;
	isOpen: boolean;
	isMainLoginModal: boolean;
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
interface IState {
	showMobileModal: boolean;
}

export default class CustomModal extends Component<IProps, IState> {
	public contextRef = createRef();
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			showMobileModal: false,
		};
	}

	public render() {
		return (
			<Grid>
				{/* modal for desktop. */}
				<Grid.Column computer={16} only='computer' zeropadding='1'>
					<Modal
						desktopmodal='1'
						recovercodedesktopmodal={this.props.isRecoverPassword ? '1' : null}
						fitcontentmodal={this.props.fitContent ? '1' : null}
						widerdesktopmodal={this.props.widerModal ? '1' : null}
						open={this.props.isOpen && window.innerWidth >= 1025} // if is open and window width is for desktop
						onClose={this.props.onClose}
						closeIcon={
							<Icon
								name={IconType.exit}
								size='big'
								primaryicon='1'
								onClick={this.props.onClose}
								cursorpointer='1'
								paddingtop3p='1'
								paddingleft7p='1'
							/>
						}>
						<Modal.Content>{this.renderModalContent(true)}</Modal.Content>
					</Modal>
				</Grid.Column>
				{/* modal for mobile. */}
				<Grid.Column mobile={16} tablet={16} only='mobile tablet' zeropadding='1'>
					<Modal
						mobilemodal={this.props.isMobileFullScreen ? '1' : undefined}
						mobilepopupmodal={!this.props.isMobileFullScreen ? '1' : undefined}
						open={this.props.isOpen && window.innerWidth < 1025} // if is open and window width is for mobile
						onClose={this.props.onClose}
						closeIcon={
							!this.props.isMobileFullScreen && (
								<Icon
									name={IconType.exit}
									size='big'
									primaryicon='1'
									onClick={this.props.onClose}
									cursorpointer='1'
									paddingtop3p='1'
									paddingleft95p='1'
								/>
							)
						}
						style={this.props.mobileModalOuterContainerStyle ? this.props.mobileModalOuterContainerStyle : null}>
						<Modal.Content
							fullscreenmobilemodal={this.props.isMobileFullScreen ? '1' : null}
							overflowscroll={this.props.isMobileFullScreen ? '1' : null}
							style={
								this.props.mobileModalInnerContentContainerStyle
									? this.props.mobileModalInnerContentContainerStyle
									: null
							}>
							{this.renderModalContent(false)}
						</Modal.Content>
					</Modal>
				</Grid.Column>
			</Grid>
		);
	}

	private renderModalContent(isDesktop: boolean) {
		return (
			<Container paddingbottom75={!this.props.isNoPaddingFromTop ? '1' : null} fullscreenmobilemodal='1'>
				{/* desktop header */}
				{(isDesktop || !this.props.isMobileFullScreen) && (
					<Segment
						placeholder
						nopaddingtop='1'
						marginauto='1'
						maxwidth100percent='1'
						displaytable='1' // for IE, it doesnt effect other browsers
						rightsegment={this.props.rightHeader ? '1' : null}>
						{/* the text align right is for IE, it doesnt effect other browsers */}
						<Header as='h1' textAlign='right' modalheader='1' rightheader={this.props.rightHeader ? '1' : null}>
							{this.props.headerText}
						</Header>
					</Segment>
				)}
				{/* mobile header */}
				{!isDesktop && this.props.isMobileFullScreen && !this.props.noTitle && (
					<div ref={this.contextRef as RefObject<HTMLDivElement>}>
						<Sticky context={this.contextRef}>
							<Segment
								zeromargin={this.props.isNoMarginFromTop ? '1' : null}
								marginbottom40={!this.props.isNoMarginFromTop ? '1' : null}
								inverted
								mobilemodalheadersegment='1'>
								{!this.props.isMainLoginModal ? (
									<Icon
										name={IconType.prev}
										cursorpointer='1'
										modalbackfontsizeicon='1'
										autosize='1'
										nomargin='1'
										onClick={() => {
											this.props.onBack ? this.props.onBack() : null;
										}}
									/>
								) : (
									// this is a place holder when there is no back icon
									<div style={{paddingRight: '20px', width: '29px'}} />
								)}
								<Header as='h1' textAlign='center' mobilefullscreenheader='1'>
									{this.props.headerText}
								</Header>
								<Icon
									name={IconType.exit}
									cursorpointer='1'
									modalfontsizeicon='1'
									autosize='1'
									nomargin='1'
									onClick={() => {
										this.props.onClose ? this.props.onClose() : null;
									}}
								/>
							</Segment>
						</Sticky>
					</div>
				)}
				{this.props.children}
			</Container>
		);
	}
}
