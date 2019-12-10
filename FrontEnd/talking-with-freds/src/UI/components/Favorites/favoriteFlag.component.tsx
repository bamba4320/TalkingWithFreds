import {FAVORITES_STORE} from 'BL/stores';
import FavoritesStore from 'BL/stores/Favorites.store';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {Icon, Label} from 'semantic-ui-react';

export interface IFavoriteFlagProps {
	[FAVORITES_STORE]?: FavoritesStore;
	categoryId: number;
}

export interface IFavoriteFlagState {}

@inject(FAVORITES_STORE)
@observer
export default class FavoriteFlagComponent extends React.Component<IFavoriteFlagProps, IFavoriteFlagState> {
	private favoriteStore: FavoritesStore;
	constructor(props: any) {
		super(props);
		this.favoriteStore = props[FAVORITES_STORE] as FavoritesStore;
		this.state = {};
	}

	public render() {
		return (
			<Label circular className='favorite-indication-label' onClick={this.onClick}>
				<Icon
					className='heart-icon'
					name={
						this.favoriteStore.UserFavorites.findIndex(
							(favoriteCategory) => favoriteCategory.categoryId === this.props.categoryId
						) !== -1
							? 'heart'
							: 'heart outline'
					}
					size='large'
				/>
			</Label>
		);
	}

	private onClick = async () => {
		this.favoriteStore.UserFavorites.findIndex(
			(favoriteCategory) => favoriteCategory.categoryId === this.props.categoryId
		) === -1
			? await this.favoriteStore.addFavoriteCategory(this.props.categoryId)
			: await this.favoriteStore.removeFavoriteCategory(this.props.categoryId);
	};
}
