import Head from 'next/head';
import * as React from 'react';

export interface ISeoHeaderProps {
	title?: string;
	metaDescription: string;
}

export interface ISeoHeaderState {}

export default class SeoHeader extends React.Component<ISeoHeaderProps, ISeoHeaderState> {
	constructor(props: ISeoHeaderProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<Head>
				{this.props.title ? <title>{this.props.title}</title> : null}
				{this.props.metaDescription ? <meta name='description' content={this.props.metaDescription} /> : null}
			</Head>
		);
	}
}
