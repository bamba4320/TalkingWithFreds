import {FAVORITES_STORE} from 'BL/stores';
import FavoritesStore from 'BL/stores/Favorites.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Container, Icon, Image, Popup} from 'semantic-ui-react';

export interface IFavoritePopupProps {
	trigger: any;
	[FAVORITES_STORE]?: FavoritesStore;
	intl: InjectedIntl;
}

export interface IFavoritePopupState {}

@inject(FAVORITES_STORE)
@observer
class FavoritesPopupComponent extends React.Component<IFavoritePopupProps, IFavoritePopupState> {
	private favoritesStore: FavoritesStore;
	constructor(props: IFavoritePopupProps) {
		super(props);
		this.favoritesStore = this.props[FAVORITES_STORE] as FavoritesStore;
		this.state = {};
	}

	public render() {
		const intl = this.props.intl as InjectedIntl;
		return (
			<Popup
				trigger={this.props.trigger}
				content={
					<Container className='popup-container'>
						<Icon name='remove' onClick={this.onClick} className='popup-close-icon' />
						<Container>
							<Image src='/static/images/heart.png' className='popup-image' />
						</Container>
						<Container>"{this.favoritesStore.getShownName}"</Container>
						<Container>{intl.formatMessage({id: 'favorites.added'})}</Container>
						<Link href={routesPaths.favorites.root}>
							<a>
								<Button
									className='to-favorites-button'
									circular
									content={intl.formatMessage({id: 'favorites.toFavorites'})}
									onClick={this.onClick}
								/>
							</a>
						</Link>
					</Container>
				}
				open={this.favoritesStore.getIsPopUpOpen}
				position='bottom center'
			/>
		);
	}

	private onClick = () => {
		this.favoritesStore.setIsPopUpOpen(false);
	};
}
export default withIntl(FavoritesPopupComponent);
