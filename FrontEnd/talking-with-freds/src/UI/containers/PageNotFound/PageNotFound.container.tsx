import * as React from 'react';

export interface IPageNotFoundProps {}

export interface IPageNotFoundState {}

export default class PageNotFoundContainer extends React.Component<IPageNotFoundProps, IPageNotFoundState> {
	constructor(props: IPageNotFoundProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return <div>This page is not exists :(</div>;
	}
}
