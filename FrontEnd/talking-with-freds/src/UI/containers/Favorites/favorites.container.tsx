import {FAVORITES_STORE} from 'BL/stores';
import FavoritesStore from 'BL/stores/Favorites.store';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Breadcrumb, Container, Icon} from 'semantic-ui-react';
import CustomSearchGifts from 'UI/components/custom/customSearchFift/CustomSearchGifts.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import ContentLoadingComponent from 'UI/components/Favorites/ContentLoading.component';
import FavoritesComponent from 'UI/components/Favorites/favorites.component';

export interface IFavoritesContainerProps {
	mobileDetect: MobileDetect;
	[FAVORITES_STORE]: FavoritesStore;
	intl: InjectedIntl;
}

export interface IFavoritesContainerState {}

@inject(FAVORITES_STORE)
@observer
class FavoritesContainer extends React.Component<IFavoritesContainerProps, IFavoritesContainerState> {
	private favoritesStore: FavoritesStore;
	constructor(props: IFavoritesContainerProps) {
		super(props);
		this.favoritesStore = this.props[FAVORITES_STORE] as FavoritesStore;
		this.state = {};
	}

	public render() {
		const intl = this.props.intl as InjectedIntl;
		return (
			<Container fluid textAlign='center' className='favorites-overlap-container'>
				<CustomResponsiveWrapper
					mobileDetect={this.props.mobileDetect}
					desktopComponent={
						<CustomTitleComponent content={intl.formatMessage({id: 'favorites.title'})}>
							<Breadcrumb>
								<Link href='/'>
									<a>
										<Breadcrumb.Section whitesection='1'>
											{intl.formatMessage({id: 'general.nofshonit'})}
										</Breadcrumb.Section>
									</a>
								</Link>
								<Breadcrumb.Divider whitedivider='1' icon='left angle' />
								<Breadcrumb.Section>{intl.formatMessage({id: 'favorites.title'})}</Breadcrumb.Section>
							</Breadcrumb>
						</CustomTitleComponent>
					}
					mobileComponent={
						<div className='mobile-title-div'>
							<FormattedMessage id='favorites.title' />
						</div>
					}
				/>
				<Container fluid textAlign='center' className='favorites-grid-container'>
					{this.renderCategoriesOrEmptyState()}
				</Container>
			</Container>
		);
	}

	public renderCategoriesOrEmptyState() {
		const intl = this.props.intl as InjectedIntl;

		if (this.favoritesStore.isLoadingFavorites) {
			return <ContentLoadingComponent />;
		} else {
			if (!this.favoritesStore.isEmpty) {
				return (
					<FavoritesComponent
						mobileDetect={this.props.mobileDetect}
						favoritesArray={this.favoritesStore.UserFavorites}
					/>
				);
			} else {
				return (
					<Container fluid className='no-favorites-main-container'>
						<CustomResponsiveWrapper
							mobileDetect={this.props.mobileDetect}
							desktopComponent={
								<CustomSearchGifts
									isMobile={false}
									intl={this.props.intl}
									title={intl.formatMessage({id: 'favorites.emptyMessage.desktopH1'})}
									isFavoritesDesktop={true}
									description={
										<div>
											{intl.formatMessage({id: 'favorites.emptyMessage.desktopSubHeaderP1'})}
											<Icon className='heart-icon-in-text' name={'heart'} />
											{intl.formatMessage({id: 'favorites.emptyMessage.desktopSubHeaderP2'})}
										</div>
									}
								/>
							}
							mobileComponent={
								<CustomSearchGifts
									isMobile={true}
									intl={this.props.intl}
									title={intl.formatMessage({id: 'favorites.emptyMessage.mobileH1'})}
									description={intl.formatMessage({id: 'favorites.emptyMessage.mobileSubHeader'})}
								/>
							}
						/>
					</Container>
				);
			}
		}
	}
}

export default withIntl(FavoritesContainer);
