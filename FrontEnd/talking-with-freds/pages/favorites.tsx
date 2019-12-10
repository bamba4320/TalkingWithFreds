import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import {NextContext} from 'next';
import SeoHeader from 'NextJsComponents/SeoHeader/SeoHeader';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import FavoritesContainer from 'UI/containers/Favorites/favorites.container';

const Favorites = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<>
			<SeoHeader
				title={intl.formatMessage({id: 'seo.FavoritesTitle'})}
				metaDescription={intl.formatMessage({id: 'seo.FavoritesDescription'})}
			/>
			<FavoritesContainer mobileDetect={props.mobileDetect} />
		</>
	);
};

Favorites.getInitialProps = (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
	return {
		mobileDetect,
	};
};

export default withIntl(Favorites);
