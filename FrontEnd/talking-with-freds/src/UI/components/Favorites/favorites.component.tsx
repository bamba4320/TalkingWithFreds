import FavoriteCategoryModel from 'common/models/FavoriteCategory.model';
import React from 'react';
import {Grid} from 'semantic-ui-react';
import GiftCategoryComponent from '../GiftsCategories/GiftCategory.component';
import {observer} from 'mobx-react';

export interface IFavoritesComponentProps {
	mobileDetect: MobileDetect;
	favoritesArray: FavoriteCategoryModel[];
}

export interface IFavoritesComponentState {}

@observer
class FavoritesComponent extends React.Component<IFavoritesComponentProps, IFavoritesComponentState> {
	constructor(props: IFavoritesComponentProps) {
		super(props);
	}

	public render() {
		return (
			<Grid>
				{this.props.favoritesArray.map((favoriteCategory, index) => (
					<Grid.Column
						computer={5}
						largeScreen={4}
						widescreen={4}
						tablet={8}
						mobile={16}
						style={{textAlign: 'center'}}
						key={`${favoriteCategory.categoryId}_${index}`}>
						<GiftCategoryComponent key={favoriteCategory.categoryId} categoryCardDetailes={favoriteCategory} />
					</Grid.Column>
				))}
			</Grid>
		);
	}
}

export default FavoritesComponent;
