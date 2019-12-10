import {MODAL_STORE} from 'BL/stores';
import ModalStore from 'BL/stores/Modal.store';
import Lang from 'Infrastructure/Language/Language';
import {inject} from 'mobx-react';
import * as React from 'react';
import {Button, Container, Grid, Header, Icon, Image, GridRow} from 'semantic-ui-react';
import RecoverDigitalCodeContainer from 'UI/containers/RecoverDigitalCode/RecoverDigitalCode.container';
import CustomTitleComponent from '../../custom/customTitle/CustomTitle.component';
import CustomResponsiveWrapper from '../../CustomResponsiveWrapper';

export interface ICardActionProps {
	[MODAL_STORE]?: ModalStore;
	mobileDetect: MobileDetect;
	showBalance: boolean;
	showTransfer: boolean;
	openModal?: any;
	closeModal?: any;
	categoryName?: string;
}

export interface ICardActionState {}

@inject(MODAL_STORE)
export default class CardAction extends React.Component<ICardActionProps, ICardActionState> {
	private modalStore: ModalStore;
	constructor(props: ICardActionProps) {
		super(props);
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.state = {};
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				mobileComponent={this.renderMobile()}
				desktopComponent={this.renderDesktop()}
			/>
		);
	}

	public renderDesktop() {
		return (
			<Grid className='card-action'>
				<Grid.Row>
					<Container fluid paddingright7p='1' paddingtop40='1'>
						<Header as='h2' primaryheader='1' h1font='1'>
							{Lang.format('cardAction.title')}
						</Header>
					</Container>
				</Grid.Row>
				<Grid.Row>
					<Container cardactiontext='1' fluid paddingright7p='1'>
						{Lang.format('cardAction.description')}
					</Container>
				</Grid.Row>
				<Grid.Row>
					<Container fluid paddingright7p='1'>
						{this.props.showBalance && (
							<a href='https://www.dts.co.il/cardbalance' target='_blank'>
								<Button opositebutton='1' circular>
									{Lang.format('cardAction.balanceInquiry')}
								</Button>
							</a>
						)}
						{/* // TODO: Itay - change href to real
						// this is card transfer for stage 2
						{this.props.showTransfer && (
							<a href='/' target='_blank'>
								<Button opositebutton='1' circular>
									{Lang.format('cardAction.cardTransfer')}
								</Button>
							</a>
						)} */}
						<Button
							opositebutton='1'
							circular
							onClick={() => {
								this.modalStore.openModal(<RecoverDigitalCodeContainer />, {
									title: 'digitalCodeRecovery.Title',
									fullScreen: true,
									closeFromOutsideModal: true,
									isRecoverPassword: true,
								});
							}}>
							{Lang.format('cardAction.digitalCode')}
						</Button>
						<a href='http://www.dts.co.il/NofshintUpgrade' target='_blank'>
							<Button opositebutton='1' circular>
								{Lang.format('cardAction.upgrade')}
							</Button>
						</a>
					</Container>
				</Grid.Row>
			</Grid>
		);
	}

	public renderMobile() {
		return (
			<div className='card-action-mobile'>
				<CustomTitleComponent
					toptag
					notMain
					padding='50px 10px 0 0'
					fontszheader='3.5rem'
					width='75%'
					custombg='#62c6bf'
					content={Lang.format('cardAction.title')}>
					{this.props.categoryName}
				</CustomTitleComponent>
				<Icon
					className='back-btn'
					name='angle right'
					size='big'
					onClick={() => {
						this.props.closeModal(false);
					}}
				/>
				<Image src='/static/images/card-action.png' className='z-img' />
				<Container width100='1' textaligncenter='1' margin0='1' className='btn-mobile-container'>
					{this.props.showBalance && (
						<a className='cardactionbtnmobile' href='https://www.dts.co.il/cardbalance' target='_blank'>
							{Lang.format('cardAction.balanceInquiry')}
							<Icon className='angle-left-icon' name='angle left' size='small' />
						</a>
					)}

					{/* // this is card transfer for stage 2  */}
					{/* {this.props.showTransfer && (
							<a className='cardactionbtnmobile' href='/' target='_blank'>
								{Lang.format('cardAction.cardTransfer')}
								<Icon className='angle-left-icon' name='angle left' size='small' />
							</a>
						)} */}
					<div
						className='cardactionbtnmobile'
						onClick={() => {
							this.modalStore.openModal(<RecoverDigitalCodeContainer />, {
								title: 'digitalCodeRecovery.Title',
								fullScreen: true,
								closeFromOutsideModal: true,
							});
						}}>
						{Lang.format('cardAction.digitalCode')}
						<Icon className='angle-left-icon' name='angle left' size='small' />
					</div>
					<a className='cardactionbtnmobile' href='http://www.dts.co.il/NofshintUpgrade' target='_blank'>
						{Lang.format('cardAction.upgrade')}
						<Icon className='angle-left-icon' name='angle left' size='small' />
					</a>
				</Container>
			</div>
		);
	}
}
