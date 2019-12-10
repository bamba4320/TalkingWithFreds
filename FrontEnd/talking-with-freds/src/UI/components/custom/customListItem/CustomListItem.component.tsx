import Link from 'next/link';
import React from 'react';
import {List} from 'semantic-ui-react';
interface IProps {
	content: string;
	to?: string;
	onClick?: any;
	newTab?: boolean;
}

export default class CustomListItemComponent extends React.Component<IProps> {
	public render() {
		return (
			<List.Item paddingbottom10='1' onClick={this.props.onClick && this.props.onClick}>
				{this.props.to ? (
					<Link href={this.props.to}>
						<a target={this.props.newTab ? '_blank' : ''}>{this.props.content}</a>
					</Link>
				) : (
					<a>{this.props.content}</a>
				)}
			</List.Item>
		);
	}
}
