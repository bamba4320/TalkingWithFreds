import Logger from 'common/utils/logger/logger';
import * as React from 'react';

export interface IJsonPretifyProps {
	title: string;
	jsonObject: any;
}

export interface IJsonPretifyState {}

export default class JsonPretify extends React.Component<IJsonPretifyProps, IJsonPretifyState> {
	public render() {
		const title = this.props.title;
		let jsonStringified = {};
		try {
			jsonStringified = JSON.stringify(this.props.jsonObject, null, 4);
		} catch (err) {
			Logger.error('error occurd in stringify object', err);
		}

		return (
			<div className={'pretify-container'}>
				<h4>{title}</h4>
				<pre>
					<code>{jsonStringified}</code>
				</pre>
			</div>
		);
	}
}
