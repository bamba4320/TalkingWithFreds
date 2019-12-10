import {LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import Link from 'next/link';
import * as React from 'react';
import {FormattedMessage, FormattedNumber, FormattedRelative, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';

const Intl = (props: any) => {
	const intl: InjectedIntl = props.intl;
	return (
		<div style={{padding: '10px'}}>
			<Link href='/'>
				<a>home page</a>
			</Link>
			<div>
				<div>this is message with intl</div>
				<div>
					{intl.formatMessage({
						id: 'intl.text3',
						description: 'message description',
						defaultMessage: 'this is default message for injected',
					})}
				</div>
			</div>
			<div>
				<FormattedMessage id='intl.text1' defaultMessage='Hello, World!' />
			</div>
			<div>
				<FormattedMessage id='intl.text2' defaultMessage='Default Message {name}' values={{name: 'gal madar'}} />
			</div>
			<div>
				<FormattedRelative value={new Date(2019, 7, 24)} updateInterval={1000} />
			</div>
			<div>
				<FormattedRelative value={new Date(2017, 7, 24)} updateInterval={1000} />
			</div>
			<div>
				<FormattedRelative value={new Date()} updateInterval={1000} />
			</div>
			<div>
				<FormattedNumber minimumIntegerDigits={2} value={1642} />
			</div>
			<div>
				<FormattedNumber minimumIntegerDigits={3} value={1} />
			</div>
			<div>
				<FormattedNumber minimumIntegerDigits={3} value={22} />
			</div>
			<div>
				<FormattedNumber minimumIntegerDigits={3} value={303} />
			</div>
		</div>
	);
};

Intl.getInitialProps = () => {
	return {
		[LayoutPageOptions.withoutFooter]: true,
		[LayoutPageOptions.withoutHeader]: true,
	};
};

export default withIntl(Intl);
