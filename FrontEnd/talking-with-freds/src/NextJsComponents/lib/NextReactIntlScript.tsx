import React from 'react';

export interface INextReactIntlScriptProps {
	locale: string;
	localeDataScript: string;
}

export interface INextReactIntlScriptState {}

export default class NextReactIntlScript extends React.Component<INextReactIntlScriptProps, INextReactIntlScriptState> {
	public render() {
		const {locale, localeDataScript} = this.props;
		const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`;

		return (
			<>
				<script src={polyfill} />
				<script
					dangerouslySetInnerHTML={{
						__html: localeDataScript,
					}}
				/>
			</>
		);
	}
}
