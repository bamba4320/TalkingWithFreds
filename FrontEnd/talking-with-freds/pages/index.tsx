import UserAgentDetecor from 'common/utils/processUtils/UserAgentDetecor';
import { NextContext } from 'next';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import { ApplicationPageOptions } from 'common/generalconsts/pageOptions.enums';

const Index = (props: any) => {
	const intl = props.intl as InjectedIntl;
	return (
		<div/>
	);
};

Index.getInitialProps = async (ctx: NextContext) => {
	const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];

	const mobxStores = (ctx as any)[ApplicationPageOptions.mobxStores];

	return {
		mobileDetect,
	};
};

export default withIntl(Index);
