import {LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import Logger from 'common/utils/logger/logger';
import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import {NextContext} from 'next';
import * as React from 'react';
import withIntl from 'ReactIntlComponents/withIntl';

const gal = (props: any) => {
	return (
		<div style={{padding: '10px'}}>
			<div>rendered from cookies</div>
			<div>{props.galCo}</div>
		</div>
	);
};

gal.getInitialProps = (ctx: NextContext) => {
	let galCo: any = 'no cookies';
	try {
		galCo = NofhonitCookies.getCookie('galCo', ctx);
	} catch (err) {
		Logger.error('error in getting cookie', err);
	}
	return {
		galCo,
		[LayoutPageOptions.withoutFooter]: true,
		[LayoutPageOptions.withoutHeader]: true,
	};
};

export default withIntl(gal);
