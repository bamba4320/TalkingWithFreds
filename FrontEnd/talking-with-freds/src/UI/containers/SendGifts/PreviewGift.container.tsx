import {CONFIGURATION_STORE, PURCHASE_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {Card, Header, Icon, Image, Segment} from 'semantic-ui-react';
import HtmlMessageComponent from 'UI/components/custom/customHtmlMessage/customHtmlMessage.component';
import CustomVariantPrice from 'UI/components/custom/CustomVariantPrice/CustomVariantPrice';

interface IProps {
	[PURCHASE_STORE]?: PurchaseStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	ref?: any;
	isMobile?: boolean;
}
interface IState {}

@inject(PURCHASE_STORE, CONFIGURATION_STORE)
@observer
export default class PreviewGiftContainer extends Component<IProps, IState> {
	public purchaseStore: PurchaseStore;
	public configurationStore: ConfigurationStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.state = {};
	}

	public render() {
		return (
			<div className={this.purchaseStore.getSendGiftModel.isToMySelf ? '' : 'preview-gift-contianer'}>
				{!this.purchaseStore.getSendGiftModel.isToMySelf ? (
					!this.props.isMobile ? (
						<div className='preview-width'>{this.renderContent()}</div>
					) : (
						this.renderContent()
					)
				) : null}
			</div>
		);
	}

	private renderContent = () => {
		return (
			<>
				<Image src='/static/images/Phone_Preview.png' automargin='1' />
				<div className='overfolw-div'>
					<div className='logo-div'>
						<Image src='/static/images/nofshonitLogo.png' automargin='1' />
					</div>
					<div className='image-div'>
						<Image
							src={this.purchaseStore.getSendGiftModel.media && this.purchaseStore.getSendGiftModel.media}
							borderradius5='1'
						/>
					</div>
					<Segment placeholder className='blessing-segment'>
						{(this.purchaseStore.getSendGiftModel.toMemberName
							? this.purchaseStore.getSendGiftModel.toMemberName + '\n'
							: '') +
							(this.purchaseStore.getSendGiftModel.blessing
								? this.purchaseStore.getSendGiftModel.blessing + '\n'
								: '') +
							(this.purchaseStore.getSendGiftModel.fromMemberName
								? this.purchaseStore.getSendGiftModel.fromMemberName
								: '')}
					</Segment>

					{(this.purchaseStore.getSendGiftModel.media || this.purchaseStore.getSendGiftModel.blessing) && (
						<div className='arrow-logo-div'>
							<Icon name='angle down' autosize='1' primaryicon='1' marginauto='1' />
						</div>
					)}
					<Card className='preview-gift-card-container' smallershadow='1'>
						<Image
							categorycardimage='1'
							wrapped
							src={
								this.purchaseStore.getCategory.image && this.purchaseStore.getCategory.image.file
									? this.configurationStore.configuration.imagesPath + this.purchaseStore.getCategory.image.file
									: '/static/placeholders/image-placeholder.png'
							}
						/>
						<Card.Content className='card-main-content'>
							<Header className='main-card-header'>
								{this.purchaseStore.getVariant.name}
								<Header.Subheader className='sub-header'>
									<HtmlMessageComponent htmlMessage={this.purchaseStore.getVariant.description} />
								</Header.Subheader>
							</Header>
						</Card.Content>
					</Card>
				</div>
			</>
		);
	};
}
