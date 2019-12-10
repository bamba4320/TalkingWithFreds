import {MODAL_STORE} from 'BL/stores';
import ModalStore from 'BL/stores/Modal.store';
import BenefitPageModel from 'common/models/BenefitPage.model';
import CategoryDTO from 'common/models/DTOs/Category.dto';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import {Button, Container, Grid, Header} from 'semantic-ui-react';
import CustomResponsiveWrapper from '../CustomResponsiveWrapper';
import CardAction from './CardAction/CardAction.component';
import MustToKnowComponent from './MustToKnow/MustToKnow.component';
export interface IProps {
	mobileDetect: MobileDetect;
	category: CategoryDTO | BenefitPageModel;
	isHiddenCardActions?: boolean;
	[MODAL_STORE]?: ModalStore;
}

export interface IState {
	isExpired: boolean;
	showBalance: boolean;
}

@inject(MODAL_STORE)
@observer
export default class MustKnowAndCardActions extends React.Component<IProps, IState> {
	private modalStore: ModalStore;
	constructor(props: IProps) {
		super(props);
		this.state = {
			isExpired: false,
			showBalance: false,
		};
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public componentDidMount() {
		let isExpired = false;
		let showBalance = false;
		this.props.category.variants.map((variant) => {
			isExpired = moment(variant.expireDate) < moment() && isExpired;
			showBalance = variant.showCardBalanceRestaurants || variant.showCardBalanceVerifone || showBalance;
		});
		this.setState({isExpired, showBalance});
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
			<Grid.Row className='must-to-know-row'>
				<Grid>
					<Grid.Column width={1} zeropadding='1' />
					<Grid.Column
						style={{padding: '0', boxShadow: this.props.isHiddenCardActions ? 'none' : '-1px 0px 0px 0px #992a84'}}
						widescreen={this.props.isHiddenCardActions ? 14 : 9}
						largeScreen={this.props.isHiddenCardActions ? 14 : 9}
						computer={this.props.isHiddenCardActions ? 14 : 8}>
						<Grid.Row>
							<Container fluid paddingright40='1'>
								<MustToKnowComponent
									MustToKnow={this.props.category.mustKnow}
									mobileDetect={this.props.mobileDetect}
									additionalInfo={this.props.category.additionalInfo}
									redimType={this.props.category.variants[0] && this.props.category.variants[0].redimTypeName}
									expireDate={this.props.category.variants[0] && this.props.category.variants[0].expireDateDesc}
									isHidden={this.props.isHiddenCardActions}
								/>
							</Container>
						</Grid.Row>
					</Grid.Column>
					{!this.props.isHiddenCardActions && (
						<Grid.Column widescreen={6} largeScreen={6} computer={7}>
							<Grid.Row>
								<Container fluid paddingright40='1'>
									<CardAction
										mobileDetect={this.props.mobileDetect}
										showBalance={this.state.showBalance}
										showTransfer={!this.state.isExpired}
									/>
								</Container>
							</Grid.Row>
						</Grid.Column>
					)}
				</Grid>
			</Grid.Row>
		);
	}

	public renderMobile() {
		return (
			<Grid>
				<Grid.Row>
					<Button onClick={this.onClickMustToKnow} mobileactionbtn='1' letterspacing2='1' musttoknowbtnmobile='1'>
						<Header as='h3' headerbtnmobile='1'>
							{Lang.format('benefitPage.mustToKnow')}
							<Header.Subheader whitesubheader='1'>{Lang.format('benefitPage.mustToKnowDesc')}</Header.Subheader>
						</Header>
					</Button>
				</Grid.Row>
				{!this.props.isHiddenCardActions && (
					<Grid.Row>
						<Button onClick={this.onClickCardAction} mobileactionbtn='1' letterspacing2='1' actionbtnmobile='1'>
							<Header as='h3' headerbtnmobile='1'>
								{Lang.format('benefitPage.actionCard')}
								<Header.Subheader whitesubheader='1'>{Lang.format('benefitPage.actionCardDesc')}</Header.Subheader>
							</Header>
						</Button>
					</Grid.Row>
				)}
			</Grid>
		);
	}

	private onClickMustToKnow = () => {
		this.modalStore.openModal(
			<MustToKnowComponent
				MustToKnow={this.props.category.mustKnow}
				mobileDetect={this.props.mobileDetect}
				openModal={this.modalStore.openModal}
				closeModal={this.modalStore.closeModal}
				categoryName={this.props.category.categoryName}
				additionalInfo={this.props.category.additionalInfo}
				redimType={this.props.category.variants[0] && this.props.category.variants[0].redimTypeName}
				expireDate={this.props.category.variants[0] && this.props.category.variants[0].expireDateDesc}
				isHidden={this.props.isHiddenCardActions}
			/>,
			{
				title: 'mustToKnow.title',
				fullScreen: true,
				closeFromOutsideModal: true,
				noTitle: true,
			}
		);
	};

	private onClickCardAction = () => {
		this.modalStore.openModal(
			<CardAction
				showBalance={this.state.showBalance}
				showTransfer={!this.state.isExpired}
				mobileDetect={this.props.mobileDetect}
				openModal={this.modalStore.openModal}
				closeModal={this.modalStore.closeModal}
				categoryName={this.props.category.categoryName}
			/>,
			{
				title: 'cardAction.title',
				fullScreen: true,
				closeFromOutsideModal: true,
				noTitle: true,
				isNoPaddingFromTop: true,
			}
		);
	};
}
