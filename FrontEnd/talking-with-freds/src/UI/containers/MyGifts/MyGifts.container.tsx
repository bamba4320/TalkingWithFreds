import {CONFIGURATION_STORE, MYGIFTS_STORE, CURRENT_USER_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import MyGiftsStore from 'BL/stores/MyGifts.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl, FormattedMessage} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Breadcrumb, Grid, Menu} from 'semantic-ui-react';
import CustomIdLinkComponent from 'UI/components/custom/customLink/CustomIdLink.component';
import CustomSearchGifts from 'UI/components/custom/customSearchFift/CustomSearchGifts.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import MyGiftsVariantComponent from 'UI/components/Mygifts/MyGiftsVariant.component';
import CurrentUserStore from 'BL/stores/CurrentUser.store';

interface IAppRoutingProps {
	[MYGIFTS_STORE]?: MyGiftsStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
}

interface IAppRoutingState {
	activeItem: string;
}

@inject(MYGIFTS_STORE, CONFIGURATION_STORE, CURRENT_USER_STORE)
@observer
class MyGiftsContainer extends React.Component<IAppRoutingProps, IAppRoutingState> {
	private myGiftsStore: MyGiftsStore;
	private configurationStore: ConfigurationStore;
	private currentUserStore: CurrentUserStore;
	constructor(props: IAppRoutingProps) {
		super(props);
		this.state = {activeItem: this.props.intl.formatMessage({id: 'myGifts.get'})};
		this.myGiftsStore = this.props[MYGIFTS_STORE] as MyGiftsStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
	}

	public handleItemClick = (_e: any, {name}: any) => this.setState({activeItem: name});

	public renderGet() {
		const intl = this.props.intl as InjectedIntl;
		if (this.myGiftsStore.ReceivedGifts.length > 0) {
			return (
				<Grid paddingbottom70px='1'>
					{this.myGiftsStore.ReceivedGifts.map((gift) => {
						return (
							<Grid.Column
								computer={5}
								largeScreen={4}
								widescreen={4}
								tablet={8}
								mobile={16}
								style={{textAlign: 'center'}}
								key={gift.transferGuid}>
								<CustomIdLinkComponent pathname={routesPaths.productToMember.root} id={gift.transferGuid} openNewTab>
									<MyGiftsVariantComponent
										srcImg={gift.image ? gift.image.file : ''}
										imagesPath={this.configurationStore.configuration.imagesPath}
										title={gift.category.categoryName}
										description={gift.category.shortDescription}
										price={gift.price}
										fromOrTo={gift.sendFrom ? gift.sendFrom : this.currentUserStore.getCurrentUserNameForPurchase}
										expiredDate={gift.expiredDate}
										status={gift.status}
										intl={this.props.intl}
										inDate={gift.sentDate}
										give={false}
									/>
								</CustomIdLinkComponent>
							</Grid.Column>
						);
					})}
				</Grid>
			);
		} else {
			return (
				<div className='empty-state-div'>
					<CustomResponsiveWrapper
						mobileDetect={this.props.mobileDetect}
						mobileComponent={
							<CustomSearchGifts
								isMobile={true}
								intl={this.props.intl}
								title={intl.formatMessage({id: 'status.Empty1'})}
								description={intl.formatMessage({id: 'status.Empty2'})}
							/>
						}
						desktopComponent={
							<CustomSearchGifts
								isMobile={false}
								intl={this.props.intl}
								title={intl.formatMessage({id: 'status.Empty1'})}
								description={intl.formatMessage({id: 'status.Empty2'})}
							/>
						}
					/>
				</div>
			);
		}
	}

	public renderGive() {
		const intl = this.props.intl as InjectedIntl;
		if (this.myGiftsStore.SentGifts.length > 0) {
			return (
				<Grid paddingbottom70px='1'>
					{this.myGiftsStore.SentGifts.map((gift) => {
						return (
							<Grid.Column
								computer={5}
								largeScreen={4}
								widescreen={4}
								tablet={8}
								mobile={16}
								style={{textAlign: 'center'}}
								key={gift.transferDetails.transferGuid}>
								<CustomIdLinkComponent pathname={routesPaths.giftPage.root} id={gift.categoryNumber}>
									<MyGiftsVariantComponent
										srcImg={gift.image ? gift.image.file : ''}
										title={gift.category.categoryName}
										imagesPath={this.configurationStore.configuration.imagesPath}
										description={gift.category.shortDescription}
										price={gift.transferDetails.price}
										fromOrTo={gift.transferDetails.sendTo}
										intl={intl}
										inDate={gift.transferDetails.sentDate}
										transferBy={gift.transferDetails.transferBy}
										give
									/>
								</CustomIdLinkComponent>
							</Grid.Column>
						);
					})}
				</Grid>
			);
		} else {
			return (
				<div className='empty-state-div'>
					<CustomResponsiveWrapper
						mobileDetect={this.props.mobileDetect}
						mobileComponent={
							<CustomSearchGifts
								isMobile={true}
								intl={this.props.intl}
								title={intl.formatMessage({id: 'status.Empty3'})}
								description={intl.formatMessage({id: 'status.Empty4'})}
							/>
						}
						desktopComponent={
							<CustomSearchGifts
								isMobile={false}
								intl={this.props.intl}
								title={intl.formatMessage({id: 'status.Empty3'})}
								description={intl.formatMessage({id: 'status.Empty4'})}
							/>
						}
					/>
				</div>
			);
		}
	}
	public render() {
		const intl = this.props.intl as InjectedIntl;
		const {activeItem} = this.state;
		return (
			<div className='mygifts-main-div'>
				<CustomResponsiveWrapper
					mobileComponent={null}
					mobileDetect={this.props.mobileDetect}
					desktopComponent={
						<CustomTitleComponent content={intl.formatMessage({id: 'myGifts.MyGifts'})}>
							<Breadcrumb>
								<Link href='/'>
									<a>
										<Breadcrumb.Section whitesection='1'>
											<FormattedMessage id='general.nofshonit' />
										</Breadcrumb.Section>
									</a>
								</Link>
								<Breadcrumb.Divider whitedivider='1' icon='left angle' />
								<Breadcrumb.Section>{intl.formatMessage({id: 'myGifts.MyGifts'})}</Breadcrumb.Section>
							</Breadcrumb>
						</CustomTitleComponent>
					}
				/>

				<div className='menu-div'>
					<Menu pointing secondary className='menu'>
						<Menu.Item
							name={intl.formatMessage({id: 'myGifts.get'})}
							mygifts='1'
							className='menu-item'
							active={activeItem === intl.formatMessage({id: 'myGifts.get'})}
							onClick={(_e, {name}) => (name ? this.setState({activeItem: name}) : null)}
						/>
						<Menu.Item
							mygifts='1'
							className='menu-item'
							name={intl.formatMessage({id: 'myGifts.Give'})}
							active={activeItem === intl.formatMessage({id: 'myGifts.Give'})}
							onClick={(_e, {name}) => (name ? this.setState({activeItem: name}) : null)}
						/>
					</Menu>
				</div>
				{activeItem === intl.formatMessage({id: 'myGifts.get'}) ? this.renderGet() : this.renderGive()}
			</div>
		);
	}
}
export default withIntl(MyGiftsContainer);
