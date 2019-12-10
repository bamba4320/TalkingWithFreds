import BenefitPageModel from 'common/models/BenefitPage.model';
import {BusinessesInfoDTO} from 'common/models/DTOs/BusinessesInfo.dto';
import CategoryDTO from 'common/models/DTOs/Category.dto';
import BrowserUtils from 'common/utils/browser/BrowserUtils';
import {observer} from 'mobx-react';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import ReactToPrint from 'react-to-print';
import withIntl from 'ReactIntlComponents/withIntl';
import {Header, Icon, Image} from 'semantic-ui-react';
import BrandsAndStoresComponent from 'UI/components/BrandsAndStores/BrandsAndStores.component';
import HtmlMessageComponent from 'UI/components/custom/customHtmlMessage/customHtmlMessage.component';
import CustomRangePrice from 'UI/components/custom/CustomRangePrice/CustomRangePrice.custom';

export interface IBenefitPrintProps {
	intl?: InjectedIntl;
	category: CategoryDTO | BenefitPageModel;
	benefitPageName: string;
	benefitPageDescription: string;
	benefitPrice?: string;
	benefitImage: string;
	imagePath: string;
	code?: any;
	benefitBrandsAndStores: BusinessesInfoDTO[];
}

export interface IBenefitPrintState {}

@observer
class BenefitPrintComponent extends React.Component<IBenefitPrintProps, IBenefitPrintState> {
	private intl: InjectedIntl;
	private printRef: any = React.createRef();
	constructor(props: IBenefitPrintProps) {
		super(props);
		this.intl = this.props.intl as InjectedIntl;
	}

	public isTextUndefined = (text: string | undefined) => {
		return text ? text : '';
	};

	public render() {
		const {
			category,
			benefitPageName,
			benefitPageDescription,
			benefitPrice,
			benefitImage,
			benefitBrandsAndStores,
			imagePath,
			code,
		} = this.props;
		const placeholderImage = '/static/placeholders/image-placeholder.png';
		const browser = BrowserUtils.detectBrowser(window.navigator.userAgent.toLowerCase());
		const mustKnow = category.mustKnow ? category.mustKnow : category.mustKnowArray;
		return (
			<>
				<ReactToPrint
					trigger={() => (
						<div className='print-btn'>
							<Icon className='print-icon' name='print' size='large' />
							<p className='link-text'>{this.intl.formatMessage({id: 'benefitPage.clickHereToPrint'})}</p>
						</div>
					)}
					content={() => this.printRef}
				/>
				<div
					className='print-div'
					ref={(ref) => {
						this.printRef = ref;
					}}>
					<div>
						<div style={{textAlign: 'start', fontSize: '12px'}} x-ms-format-detection='none'>
							<div>
								{this.intl.formatMessage({id: 'benefitPage.topPrintTile.phoneNumber'})}
								<br />
								{this.intl.formatMessage({id: 'benefitPage.topPrintTile.website'})}
							</div>
						</div>
						<div
							style={{width: '900px', display: 'flex', justifyContent: 'center', paddingBottom: '20px'}}
							className='nofshonit-logo-firefox'>
							<Image src={'/static/images/nofshonitSmall.png'} />
						</div>
						<table className='print-table'>
							<tbody>
								<tr
									className={`print-tr ${
										browser === 1 || browser === 2 || browser === 5 || browser === 7
											? 'print-tr-height'
											: 'print-tr-min-height'
									}`}>
									<td className='print-td-one'>
										<Image src={benefitImage ? imagePath + benefitImage : placeholderImage} />
									</td>
									<td className={code ? 'print-td-two' : 'print-td-two without-code-two'}>
										<Header as='h2'>{this.isTextUndefined(benefitPageName)}</Header>
										{benefitPageDescription && <HtmlMessageComponent htmlMessage={benefitPageDescription} />}
										{benefitPrice && (
											<div className='benefit-print-price'>
												<CustomRangePrice minPrice={parseInt(benefitPrice, 10)} maxPrice={parseInt(benefitPrice, 10)} />
												<Header as='h3' nomargin='1'>
													<Header.Subheader>{this.intl.formatMessage({id: 'benefitPrint.checkLoad'})}</Header.Subheader>
												</Header>
											</div>
										)}
									</td>
									{code && (
										<td className='print-td-divider'>
											<div className='print-divider' />
										</td>
									)}
									{code && (
										<td className='print-td-three' style={{width: '200px'}}>
											<Header as='h2' nomargin='1'>
												{this.intl.formatMessage({id: 'benefitPage.CodeToRedeem'})}
												<Header.Subheader width150='1'>
													{this.intl.formatMessage({id: 'benefitPage.showAtBusiness'})}
												</Header.Subheader>
											</Header>
											<div>{code}</div>
										</td>
									)}
								</tr>
							</tbody>
						</table>
					</div>
					<table className='print-must-know-table'>
						<tbody>
							<tr>
								<td className='print-must-know-td'>
									<Header as='h2' className='print-title'>
										{this.props.intl && this.intl.formatMessage({id: 'benefitPage.mustKnow'})}
									</Header>

									<div className='print-must-know-data'>
										{category && (
											<>
												{category.variants[0] && category.variants[0].expireDateDesc && (
													<div className='print-must-know-item'>
														<div>
															<b>{this.intl.formatMessage({id: 'payment.validity'})}</b>
														</div>
														<div>{this.isTextUndefined(category.variants[0].expireDateDesc)}</div>
													</div>
												)}
												{mustKnow &&
													mustKnow.map((item, index: string | number | undefined) => {
														return (
															<div className='print-must-know-item' key={index}>
																<div>
																	<b>{this.isTextUndefined(item.adminDescription)}</b>
																</div>
																<div>{this.isTextUndefined(item.messageText)}</div>
															</div>
														);
													})}
												{category.additionalInfo && (
													<div className='print-must-know-item'>
														<div>
															<b>{this.intl.formatMessage({id: 'MustToKnow.ExtraInfo'})}</b>
														</div>
														<div>{this.isTextUndefined(category.additionalInfo)}</div>
													</div>
												)}
												{category.redimType && (
													<div className='print-must-know-item'>
														<div>
															<b>{this.intl.formatMessage({id: 'MustToKnow.RedimType'})}</b>
														</div>
														<div>{this.isTextUndefined(category.redimType)}</div>
													</div>
												)}
											</>
										)}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<tbody>
							<tr>
								<td className='branches-title'>
									<Header as='h2' className='print-title'>
										{this.intl.formatMessage({id: 'benefitPage.storeTile'})}
									</Header>
									<div style={{width: '600px', color: '#808080', marginBottom: '15px'}}>
										{this.intl.formatMessage({id: 'benefitPage.storeTileParagraph'})}
									</div>
								</td>
							</tr>
							<tr>
								<td className='branches-body'>
									<BrandsAndStoresComponent isPrint brandsAndStores={benefitBrandsAndStores} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</>
		);
	}
}

export default withIntl(BenefitPrintComponent);
