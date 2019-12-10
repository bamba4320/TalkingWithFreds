import {BENEFIT_STORE, UI_STORE} from 'BL/stores';
import BenefitStore from 'BL/stores/Benefit.store';
import UiStore from 'BL/stores/Ui.store';
import {KosherTexts} from 'common/generalconsts/giftFilters.enums';
import BenefitPageModel from 'common/models/BenefitPage.model';
import BranchModel from 'common/models/Branch.model';
import CategoryDTO from 'common/models/DTOs/Category.dto';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Component} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Divider, Grid, Header, Image, Label} from 'semantic-ui-react';
import HtmlMessageComponent from '../custom/customHtmlMessage/customHtmlMessage.component';
import BranchCardMoreDetails from './BranchCardMoreDescription.component';
import CustomResponsiveWrapper from '../CustomResponsiveWrapper';

export interface IProps {
	branchModel: BranchModel;
	isMobile: boolean;
	[UI_STORE]?: UiStore;
	[BENEFIT_STORE]?: BenefitStore;
	distance?: number;
	businessId: number;
	categoryId?: number;
	category: CategoryDTO | BenefitPageModel;
	latitude?: number;
	longitude?: number;
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
}

export interface IState {
	showMoreDetails: boolean;
	showMoreDescription: boolean;
}

@inject(UI_STORE, BENEFIT_STORE)
@observer
class BranchCard extends Component<IProps, IState> {
	private uiStore: UiStore;
	private benefitStore: BenefitStore;
	private branchModel: BranchModel;
	constructor(props: IProps) {
		super(props);
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.benefitStore = this.props[BENEFIT_STORE] as BenefitStore;
		this.branchModel = this.props.branchModel as BranchModel;
		this.state = {
			showMoreDetails: false,
			showMoreDescription: false,
		};
	}

	public renderICons(isMobile: boolean) {
		return (
			<>
				{(this.props.distance ||
					(this.branchModel.moreDetials &&
						this.branchModel.moreDetials.branchLocation &&
						this.branchModel.moreDetials.branchLocation.trim())) &&
					(this.props.latitude && this.props.longitude ? (
						<a
							href={
								this.props.mobileDetect && this.props.mobileDetect.is && this.props.mobileDetect.is('iPhone')
									? `maps://maps.google.com/maps?daddr=${this.props.latitude},${this.props.longitude}&amp;ll=`
									: `geo:${this.props.latitude},${this.props.longitude}`
							}
							target='_blank'>
							{this.IconAndText(
								isMobile,
								'/static/images/Location.svg',
								this.props.distance
									? this.props.distance < 1
										? _.round(this.props.distance * 1000).toString() +
										  ` ${this.props.intl.formatMessage({id: 'BranchCard.MetersFromYou'})}`
										: _.round(this.props.distance).toString() +
										  ` ${this.props.intl.formatMessage({id: 'BranchCard.KiloMetersFromYou'})}`
									: '',
								this.branchModel.moreDetials && this.branchModel.moreDetials.branchLocation
									? this.branchModel.moreDetials.branchLocation.trim()
									: ''
							)}
						</a>
					) : (
						this.IconAndText(
							isMobile,
							'/static/images/Location.svg',
							this.props.distance
								? this.props.distance < 1
									? _.round(this.props.distance * 1000).toString() +
									  ` ${this.props.intl.formatMessage({id: 'BranchCard.MetersFromYou'})}`
									: _.round(this.props.distance).toString() +
									  ` ${this.props.intl.formatMessage({id: 'BranchCard.KiloMetersFromYou'})}`
								: '',
							this.branchModel.moreDetials && this.branchModel.moreDetials.branchLocation
								? this.branchModel.moreDetials.branchLocation.trim()
								: ''
						)
					))}

				{this.branchModel.businessPhoneNumber &&
					this.IconAndText(
						isMobile,
						'/static/images/Call.svg',
						this.branchModel.businessPhoneNumber,
						this.branchModel.moreDetials ? this.branchModel.moreDetials.branchActivityHours : '',
						false,
						true
					)}
				{this.branchModel.moreDetials &&
					this.branchModel.moreDetials.businessWebstie &&
					this.IconAndText(
						isMobile,
						'/static/images/Site.svg',
						this.props.intl.formatMessage({id: 'BranchCard.MenuAndInfo'}),
						this.branchModel.moreDetials && this.branchModel.moreDetials.businessWebstie,
						true
					)}
			</>
		);
	}

	public renderContent() {
		return (
			<>
				<Header size='large' primaryheader='1'>
					<FormattedMessage
						id={
							this.branchModel.moreDetials &&
							this.branchModel.moreDetials.description &&
							this.branchModel.moreDetials.description.length > 1
								? 'branches.BenefitsPossibilities'
								: 'branches.WhatWillYouGet'
						}
					/>
				</Header>
				{this.branchModel.moreDetials &&
					this.branchModel.moreDetials.description.length > 0 &&
					this.branchModel.moreDetials.description.map((des: string, index) => (
						<BranchCardMoreDetails
							branchModel={this.branchModel}
							index={index}
							des={des}
							category={this.props.category}
						/>
					))}
				{this.branchModel.moreDetials && this.branchModel.moreDetials.kosherType ? (
					<>
						<Header size='large'>
							<FormattedMessage id='branches.Properties' />
						</Header>
						<Label normallabel='1' color='teal'>
							{KosherTexts[this.branchModel.moreDetials.kosherType.toString()]}
						</Label>
					</>
				) : (
					<></>
				)}
			</>
		);
	}

	public render() {
		return (
			<div className='branch-card-container'>
				<div onClick={this.props.isMobile ? this.handleOnClick : undefined} className='header-main-div'>
					<div className='card-image-div'>
						<Image
							roundimage='1'
							className='card-image'
							src={this.branchModel.imageUrl ? this.branchModel.imageUrl : '/static/placeholders/image-placeholder.png'}
						/>
					</div>
					<div className='content-width'>
						<Header
							className='branch-card-header text-overflow-hidden'
							smallheader1p4='1'
							boldheader='1'
							textfontheader='1'
							nomargin='1'>
							{this.branchModel.branchName}
						</Header>
						{!this.props.isMobile ? (
							<div className='inner-div'>
								<div className='inner-div'>
									<Header className='sub-headder'>
										<Header.Subheader blackheader='1'>{this.branchModel.branchLocation}</Header.Subheader>
									</Header>
									{this.branchModel.businessPhoneNumber && <div className='black-divider' />}
									<Header className='sub-headder'>
										<Header.Subheader blackheader='1'>{this.branchModel.businessPhoneNumber}</Header.Subheader>
									</Header>
								</div>

								<Button
									className='link-button'
									size='large'
									linkbutton='1'
									whitebackground='1'
									onClick={this.handleOnClick}>
									<FormattedMessage id='branches.MoreDetails' />
								</Button>
							</div>
						) : (
							<div className='inner-div'>
								<div>
									<div className='inner-div'>
										<Header className='sub-headder'>
											<Header.Subheader blackheader='1'>{this.branchModel.branchLocation}</Header.Subheader>
										</Header>
										{this.branchModel.businessPhoneNumber && <div className='black-divider' />}
										<Header className='mobile-second-header'>
											<Header.Subheader blackheader='1'>{this.branchModel.businessPhoneNumber}</Header.Subheader>
										</Header>
									</div>
								</div>
								<div />
							</div>
						)}
					</div>
				</div>
				{this.state.showMoreDetails && (
					<div className='more-details-main-div'>
						<Divider />
						<CustomResponsiveWrapper
							desktopComponent={
								<Grid className='content-div'>
									<Grid.Column width={10}>{this.renderContent()}</Grid.Column>
									<Grid.Column width={2} />
									<Grid.Column width={4}>{this.renderICons(false)}</Grid.Column>
								</Grid>
							}
							mobileDetect={this.props.mobileDetect}
							mobileComponent={
								<Grid className='content-div'>
									<Grid.Column width={16}>{this.renderICons(true)}</Grid.Column>
									<Grid.Column width={16}>{this.renderContent()}</Grid.Column>
								</Grid>
							}
						/>
					</div>
				)}
			</div>
		);
	}

	private handleOnClick = async () => {
		try {
			if (!this.state.showMoreDetails && !this.branchModel.moreDetials) {
				this.uiStore.blockUiSite();
				this.branchModel.moreDetials = await this.benefitStore.fetchBranchDetails(
					this.branchModel.branchId,
					this.props.businessId,
					this.props.categoryId
				);
				this.uiStore.unblockUiSite();
			}

			this.setState({
				showMoreDetails: !this.state.showMoreDetails,
				showMoreDescription:
					this.branchModel.moreDetials && this.branchModel.moreDetials.description
						? this.branchModel.moreDetials.description.length > 1
							? false
							: true
						: true,
			});
		} catch (e) {
			console.error(e);
		}
	};

	private IconAndText = (
		isMobile: boolean,
		iconName: string,
		mainText: string,
		subText: string,
		isLink?: boolean,
		isPhone?: boolean
	) => {
		const subHeaderText = (
			<Header zeromargintop='1'>
				<Header.Subheader className='sub-header-margin-bottom text-overflow-hidden'>
					<HtmlMessageComponent htmlMessage={subText} />
				</Header.Subheader>
			</Header>
		);
		const iconAndTextComponent = (
			<div className={isMobile ? 'flex-icon-text' : ''}>
				<div className='more-details-image-div'>
					<Image src={iconName} />
				</div>
				<div className={isMobile ? 'flex-center' : ''}>
					<Header className='smaller-header-size header-margin-bottom' textfontheader='1'>
						{mainText}
					</Header>
					{subHeaderText}
				</div>
			</div>
		);
		return (
			<div>
				{isPhone && this.props.isMobile ? (
					<a href={'tel:' + mainText}>{iconAndTextComponent}</a>
				) : isLink ? (
					<a href={subText} target='_blank'>
						{iconAndTextComponent}
					</a>
				) : (
					<>{iconAndTextComponent}</>
				)}
			</div>
		);
	};
}
export default withIntl(BranchCard);
