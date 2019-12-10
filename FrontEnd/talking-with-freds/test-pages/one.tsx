import {LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import EnvConfig from 'Infrastructure/config/env.config';
import Link from 'next/link';
import * as React from 'react';
import HowToUseContainer from 'UI/containers/HowToUse/HowToUse.container';

const One = (props: any) => {
	return (
		<div>
			<div>getApiHost: {props.getApiHost}</div>
			<div>getAppEnv: {props.getAppEnv}</div>
			<div>getNodeEnv: {props.getNodeEnv}</div>
			this is page one
			<div />
			<Link href='/tests/two'>
				<a> click here in order to go to two</a>
			</Link>
			<HowToUseContainer />
			{/* <img src='/static/gal.png' alt='my image' /> */}
			{/* <div style={{border: '1px solid green'}}>{JSON.stringify(props)}</div> */}
		</div>
	);
};

One.getInitialProps = async () => {
	return {
		[LayoutPageOptions.withoutFooter]: true,
		getAppEnv: EnvConfig.getAppEnv(),
		getNodeEnv: EnvConfig.getNodeEnv(),
	};
};
export default One;
