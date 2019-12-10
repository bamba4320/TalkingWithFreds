import Link from 'next/link';
import React from 'react';
interface IProps {
	pathname: string;
	id: number | string;
	notScroll?: boolean;
	openNewTab?: boolean;
	onClick?: any;
}

export default class CustomIdLinkComponent extends React.Component<IProps> {
	public render() {
		return (
			<Link
				scroll={!this.props.notScroll}
				href={{pathname: this.props.pathname, query: {id: this.props.id}}}
				as={`${this.props.pathname}${this.props.id ? '/' + this.props.id : ''}`}>
				<a target={this.props.openNewTab ? '_blank' : ''} onClick={this.props.onClick}>
					{this.props.children}
				</a>
			</Link>
		);
	}
}
