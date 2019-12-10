import * as React from 'react';

export interface IProps {}

export interface IState {}

export default class extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<style>{`
				html {
					scroll-behavior: smooth;
				}
			`}</style>
		);
	}
}
