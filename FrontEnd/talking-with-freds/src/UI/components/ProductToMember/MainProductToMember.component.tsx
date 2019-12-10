import {VariantTypes} from 'common/generalconsts/benefitType.enums';
import {eStatusOfUse} from 'common/generalconsts/purchase.enums';
import {VariantDTO} from 'common/models/DTOs/Variant.dto';
import ProductToMemberModel from 'common/models/ProductToMember.model';
import {routesPaths} from 'common/routes/routesPaths.consts';
import moment from 'moment';
import Link from 'next/link';
import {Component} from 'react';
import Barcode from 'react-barcode'; // https://www.npmjs.com/package/react-barcode
import {FormattedMessage, FormattedNumber, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Card, Divider, Grid, Header, Icon, Image, Placeholder, Segment} from 'semantic-ui-react';
import HtmlMessageComponent from '../custom/customHtmlMessage/customHtmlMessage.component';
import CustomIdLinkComponent from '../custom/customLink/CustomIdLink.component';

interface IProps {
	productToMember: ProductToMemberModel;
	variant?: VariantDTO;
	isMobile: boolean;
	intl?: InjectedIntl;
	onVerifonCodeClick: any;
	onMobileCodeClick: any;
	categoryImagePath: string;
	onPrintClick: any;
}
interface IState {
	isCodeOpen: boolean;
	verifoneCode: string;
	desktopBackgroundHeightForCard: number;
}

class MainProductToMemberComponent extends Component<IProps, IState> {
	private intl: InjectedIntl;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.intl = this.props.intl as InjectedIntl;
		this.state = {
			isCodeOpen: false,
			verifoneCode: '',
			desktopBackgroundHeightForCard: 435,
		};
	}

	public componentDidMount() {
		if (!this.props.isMobile) {
			const data = (window as any).desktopBackgroundCard.getBoundingClientRect();
			this.setState({desktopBackgroundHeightForCard: data.y + data.height / 2 + 30});
		}
	}

	public render() {
		return (
			<div
				className={`product-to-member-container ${
					this.props.isMobile ? 'product-to-member-container-background' : ''
				}`}>
				<div>
					{!this.props.isMobile && (
						<div
							className='desktop-background-div'
							style={{height: `${this.state.desktopBackgroundHeightForCard}px`}}
						/>
					)}
					{/* NOFSHONIT */}
					<div>
						<Link href={routesPaths.root}>
							<a>
								<Image src='/static/images/main.png' automargin='1' size={!this.props.isMobile ? 'medium' : 'small'} />
							</a>
						</Link>
					</div>
					{/* MEDIA */}
					{this.props.productToMember && this.props.productToMember.media && (
						<div className='middle-div'>
							<Image className='inner-content' size='medium' src={this.props.productToMember.media} borderradius5='1' />
						</div>
					)}
					{/* BLESSING */}
					{this.props.productToMember && this.props.productToMember.blessing && (
						<Segment placeholder className='middle-div' nopadding='1' lightpurplebackground='1' noborder='1'>
							<Header blessingtext='1' className='blessing-text'>
								<Header.Subheader
									primaryheader='1'
									blessingtext={!this.props.isMobile ? '1' : null}
									mobilenavbarheader={this.props.isMobile ? '1' : null}
									boldheader={!this.props.isMobile ? '1' : null}
									className='blessing-subheader'>
									{(this.props.productToMember.toMemberName ? this.props.productToMember.toMemberName + '\n' : '') +
										this.props.productToMember.blessing +
										(this.props.productToMember.fromMemberName
											? '\n' + this.props.productToMember.fromMemberName + '\n'
											: '')}
								</Header.Subheader>
							</Header>
						</Segment>
					)}
					{/* CARD */}
					{this.props.productToMember.category ? (
						<CustomIdLinkComponent
							pathname={routesPaths.giftPage.root}
							id={this.props.productToMember.category.categoryId}>
							{this.props.isMobile ? this.MobileCard() : this.DesktopCard()}
						</CustomIdLinkComponent>
					) : (
						<div />
					)}
					{/* IMPLEMENT HISTORY */}
					{this.props.productToMember &&
						this.props.productToMember.history &&
						this.props.productToMember.history.length > 0 &&
						this.props.productToMember.history[0] && (
							<div className='history-grid'>
								<Header
									fontsize2p2rem={!this.props.isMobile ? '1' : null}
									smallheader1p3={this.props.isMobile ? '1' : null}
									boldheader={this.props.isMobile ? '1' : null}
									primaryheader={this.props.isMobile ? '1' : null}
									textfontheader={this.props.isMobile ? '1' : null}>
									{this.intl.formatMessage({id: 'productToMember.Implements'})}
								</Header>
								<div>
									{this.props.productToMember.history.map((histObj, index) => {
										if (histObj) {
											return (
												<div className='grid-row' key={`${histObj.chainName}_${index}`}>
													<Grid>
														<Grid.Column
															mobile={4}
															tablet={5}
															computer={6}
															largeScreen={7}
															overflowellipsis='1'
															title={histObj.businessName}>
															{histObj.businessName}
														</Grid.Column>
														<Grid.Column
															mobile={4}
															tablet={4}
															computer={4}
															largeScreen={4}
															overflowellipsis='1'
															displayflex='1'
															title={histObj.chainName}>
															{histObj.chainName}
														</Grid.Column>
														<Grid.Column
															mobile={5}
															tablet={4}
															computer={4}
															largeScreen={4}
															overflowellipsis='1'
															displayflex='1'
															title={histObj.businessName}>
															{histObj.dateTime && moment(histObj.dateTime).format('DD/MM/YYYY')}
														</Grid.Column>
														<Grid.Column
															mobile={3}
															tablet={2}
															computer={2}
															largeScreen={2}
															overflowellipsis='1'
															displayflex='1'
															title={histObj.businessName}>
															{histObj.amount && (
																<>
																	<FormattedNumber value={parseInt(histObj.amount, 10)} currency='ILS' />
																	<div className='coin-text'>₪</div>
																</>
															)}
														</Grid.Column>
													</Grid>
													<Divider />
												</div>
											);
										} else {
											return <div />;
										}
									})}
								</div>
							</div>
						)}
					{/* DESKTOP DESCRIPTION */}
					{!this.props.isMobile && this.description()}
					{/* IMPLEMENT */}
					{// if its not verifone
					this.props.productToMember.eStatusOfUse === eStatusOfUse.used ||
					this.props.productToMember.eStatusOfUse === eStatusOfUse.expired
						? null
						: this.isVerifone()
						? this.state.isCodeOpen
							? // shows code header
							  this.verifoneCodeHeader()
							: // else shows code button
							  this.showCodeButton(this.openVerifoneCode)
						: this.state.isCodeOpen
						? // shows code header
						  this.codeHeader(this.props.productToMember && this.props.productToMember.code)
						: // else shows code button
						  this.showCodeButton(this.openNotVerifoneCode)}

					{/* PRINT */}
					{!this.props.isMobile && (
						<Button
							className='print-button'
							type='button'
							normalfont='1'
							linkbutton='1'
							whitebackground='1'
							paddingbottom30px='1'
							onClick={this.props.onPrintClick}>
							<Icon name='print' className='print-icon' />
							{this.intl.formatMessage({id: 'productToMember.PrintCodeAndBusiness'})}
						</Button>
					)}
				</div>
				{/* MOBILE DESCRIPTION */}
				{this.props.isMobile && this.description()}
			</div>
		);
	}

	private description = () => {
		return (
			this.props.variant && (
				<div className='middle-div'>
					<Segment placeholder className='middle-div' paddingbottom45='1' maxwidth100percent='1'>
						<>
							{this.props.productToMember.category.categoryDescription && (
								<HtmlMessageComponent
									htmlMessage={this.props.productToMember.category.categoryDescription}
									extraClassname='inner-text-context'
								/>
							)}
							<Header>
								{this.intl.formatMessage({id: 'MustToKnow.RedimType'})}
								<Header.Subheader>{this.props.variant.redimTypeName}</Header.Subheader>
							</Header>
						</>
					</Segment>
				</div>
			)
		);
	};

	private DesktopCard = () => {
		return (
			<div className='desktop-card' ref={(node) => ((window as any).desktopBackgroundCard = node)}>
				{this.props.productToMember.category.categoryId ? (
					<Image
						grayimage={
							this.props.productToMember.eStatusOfUse === eStatusOfUse.used ||
							this.props.productToMember.eStatusOfUse === eStatusOfUse.expired
								? '1'
								: null
						}
						src={
							this.props.productToMember &&
							this.props.productToMember.category.images &&
							this.props.productToMember.category.images[0] &&
							this.props.productToMember.category.images[0].file
								? this.props.categoryImagePath + this.props.productToMember.category.images[0].file
								: '/static/placeholders/image-placeholder.png'
						}
					/>
				) : (
					<Placeholder style={{width: '45%', zIndex: '5'}} className='transform-180'>
						<Placeholder.Image square className='card-image-placeholder' />
					</Placeholder>
				)}
				<div className='card-details-header'>
					{this.props.productToMember.category.categoryId ? (
						<>
							<Header as='h3' className='card-header'>
								{this.props.productToMember.category.categoryName
									? this.props.productToMember.category.categoryName
									: ''}
								{this.props.productToMember && (
									<Header.Subheader className='sub-header'>
										{this.props.productToMember.category.shortDescription}
									</Header.Subheader>
								)}
							</Header>
							{this.StatusDesktop()}
						</>
					) : (
						<Placeholder style={{width: '45%', zIndex: '5', margin: '50px 20px'}} className='transform-180'>
							<Placeholder.Paragraph>
								<Placeholder.Line length='full' />
								<Placeholder.Line length='very long' />
								<Placeholder.Line length='long' />
								<Placeholder.Line length='full' />
								<Placeholder.Line length='very long' />
								<Placeholder.Line length='long' />
							</Placeholder.Paragraph>
						</Placeholder>
					)}
				</div>
			</div>
		);
	};

	private StatusDesktop = () => {
		if (this.props.productToMember.eStatusOfUse === eStatusOfUse.used) {
			return (
				<Header className='used-header ' inlineheader='1' textfontheader='1'>
					<FormattedMessage id={'status.Used'} />
				</Header>
			);
		} else if (this.props.productToMember.eStatusOfUse === eStatusOfUse.expired) {
			return (
				<Header className='used-header ' inlineheader='1' textfontheader='1'>
					<FormattedMessage id={'status.Expired'} />
				</Header>
			);
		} else {
			return (
				<div className='price-expire-date-container'>
					<Header as='h3' className='date-header'>
						<Header.Subheader>
							{this.props.productToMember &&
								this.props.productToMember.expiredDate &&
								this.intl.formatMessage(
									{id: 'productToMember.ExpireDate'},
									{
										expireDate: moment(this.props.productToMember.expiredDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
									}
								)}
						</Header.Subheader>
					</Header>
					{this.props.productToMember && this.props.productToMember.sumToLoad ? (
						<Header as='h3' className='price-header' primaryheader='1' basealign='1'>
							<FormattedNumber value={this.props.productToMember.sumToLoad} currency='ILS' />
							<div className='coin-text'>₪</div>
						</Header>
					) : this.props.productToMember.category.price ? (
						<Header as='h3' className='price-header' primaryheader='1' basealign='1'>
							<FormattedNumber value={this.props.productToMember.category.price} currency='ILS' />
						</Header>
					) : null}
				</div>
			);
		}
	};

	private MobileCard = () => {
		return (
			<Card className='mobile-card' smallershadow='1'>
				{this.props.productToMember ? (
					<Image
						categorycardimage='1'
						wrapped
						grayimage={
							this.props.productToMember.eStatusOfUse === eStatusOfUse.used ||
							this.props.productToMember.eStatusOfUse === eStatusOfUse.expired
								? '1'
								: null
						}
						src={
							this.props.productToMember &&
							this.props.productToMember.category.images &&
							this.props.productToMember.category.images[0] &&
							this.props.productToMember.category.images[0].file
								? this.props.categoryImagePath + this.props.productToMember.category.images[0].file
								: '/static/placeholders/image-placeholder.png'
						}
					/>
				) : (
					<Placeholder className='transform-180'>
						<Placeholder.Image square className='card-image-placeholder' />
					</Placeholder>
				)}

				<Card.Content>
					<Card.Header className='main-card-header'>
						{this.props.productToMember.category.categoryName ? this.props.productToMember.category.categoryName : ''}
					</Card.Header>
					{this.props.productToMember && (
						<Header nomargin='1'>
							<Header.Subheader blackheader='1' cardsubtext='1'>
								{this.props.productToMember.category.shortDescription}
							</Header.Subheader>
						</Header>
					)}
					<Card.Content className='lower-content'>{this.StatusMobile()}</Card.Content>
				</Card.Content>
			</Card>
		);
	};

	private StatusMobile = () => {
		if (this.props.productToMember.eStatusOfUse === eStatusOfUse.used) {
			return (
				<Header className='used-header ' inlineheader='1' textfontheader='1'>
					<FormattedMessage id={'status.Used'} />
				</Header>
			);
		} else if (this.props.productToMember.eStatusOfUse === eStatusOfUse.expired) {
			return (
				<Header className='used-header ' inlineheader='1' textfontheader='1'>
					<FormattedMessage id={'status.Expired'} />
				</Header>
			);
		} else {
			return (
				<>
					<Card.Meta>
						{this.props.variant &&
							this.props.variant.expireDate &&
							this.intl.formatMessage(
								{id: 'productToMember.ExpireDate'},
								{
									expireDate: moment(this.props.variant.expireDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
								}
							)}
					</Card.Meta>
					<Card.Header primaryheader='1'>
						{this.props.productToMember && this.props.productToMember.sumToLoad ? (
							<Header className='price-header' primaryheader='1' basealign='1'>
								<FormattedNumber value={this.props.productToMember.sumToLoad} currency='ILS' />
								<div className='coin-text'>₪</div>
							</Header>
						) : this.props.productToMember.category.price ? (
							<Header className='price-header' primaryheader='1' basealign='1'>
								<FormattedNumber value={this.props.productToMember.category.price} currency='ILS' />
								<div className='coin-text'>₪</div>
							</Header>
						) : null}
					</Card.Header>
				</>
			);
		}
	};

	private showCodeButton = (onClick: any) => {
		return (
			<Button
				className='code-button'
				fluid
				circular
				mainloginbutton='1'
				opositebutton='1'
				maxwidth15rem='1'
				onClick={onClick}>
				{this.intl.formatMessage({id: 'productToMember.ShowCodeToRedeem'})}
			</Button>
		);
	};

	private codeHeader = (code: string) => {
		return (
			<div className='code-container'>
				{code && (
					<>
						<Header
							modalheader='1'
							customtitle={!this.props.isMobile ? '1' : null}
							biggerfont={this.props.isMobile ? '1' : null}>
							{this.intl.formatMessage({id: 'productToMember.CodeToRedeem'})}
						</Header>
						<Header>
							<Header.Subheader blackheader='1'>
								{this.intl.formatMessage({id: 'productToMember.ShowCodeToBusiness'})}
							</Header.Subheader>
						</Header>
						<div className='barcode-div-container'>
							<Barcode value={code} displayValue={false} background={this.props.isMobile ? '#f9f2f8' : '#ffffff'} />
						</div>
						<Header customtitle={!this.props.isMobile ? '1' : null} biggerfont={this.props.isMobile ? '1' : null}>
							{code}
						</Header>
					</>
				)}
			</div>
		);
	};

	private verifoneCodeHeader = () => {
		return (
			<div className='middle-div verifone-code-div'>
				{this.codeHeader(this.state.verifoneCode)}
				{this.state.verifoneCode && (
					<Icon
						circular
						size='big'
						name='refresh'
						marginauto='1'
						cursorpointer='1'
						primaryicon='1'
						onClick={this.openVerifoneCode}
					/>
				)}
				<Header className='code-limit-header' fitcontent='1'>
					<Header.Subheader blackheader='1'>
						{this.intl.formatMessage({id: 'productToMember.NewCodeIn10Minutes'})}
					</Header.Subheader>
				</Header>
			</div>
		);
	};

	private openVerifoneCode = async () => {
		const vc = await this.props.onVerifonCodeClick();
		this.setState({isCodeOpen: true, verifoneCode: vc});
	};

	private openNotVerifoneCode = async () => {
		this.setState({isCodeOpen: true});
	};

	private isVerifone = () => {
		return (
			this.props.variant &&
			this.props.variant.benefitTypeId &&
			this.props.variant.benefitTypeId.toString() === VariantTypes.GiftCardVerifone.toString()
		);
	};
}

export default withIntl(MainProductToMemberComponent);
