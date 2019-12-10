import Head from 'next/head';
import * as React from 'react';

export interface ICanonicalHeaderProps {
	href: string;
}

export interface ICanonicalHeaderState {}

export default class CanonicalHeader extends React.Component<ICanonicalHeaderProps, ICanonicalHeaderState> {
	constructor(props: ICanonicalHeaderProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<Head>
				<link rel='canonical' href={this.props.href} />
			</Head>
		);
	}
}
