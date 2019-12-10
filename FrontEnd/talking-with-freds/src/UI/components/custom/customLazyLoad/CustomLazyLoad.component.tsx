import React from 'react';
import LazyLoad from 'react-lazyload';

interface ICustomLazyLoadProps {
	shouldLazyLoad: boolean;
	checkLazyLoad?: boolean;
	customOffset?: number | number[];
	placeHolder?: any;
}

interface ICustomLazyLoadState {}

/**
 * In order to use this component you need to give the bool - "shouldLazyLoad"
 * to check if the LazyLoad should work - if Bot is inside the website, the LazyLoad shouldn't work
 * in order to give him the all page.
 * We get "shouldLazyLoad" as boolean instead of UserAgentDetector because
 * we don't want to check the UserAgent in every LazyLoad component, we do it in the page and pass the result into here
 * For more information about LaztLoad
 * https://www.npmjs.com/package/react-lazyload
 */
export default class CustomLazyLoad extends React.Component<ICustomLazyLoadProps, ICustomLazyLoadState> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	public renderLazyLoad = () => {
		return (
			<LazyLoad
				once
				offset={this.props.customOffset ? this.props.customOffset : [500, 0]}
				placeholder={this.props.placeHolder ? this.props.placeHolder : undefined}>
				{this.props.children}
			</LazyLoad>
		);
	};

	public render() {
		if (this.props.checkLazyLoad) {
			if (this.props.shouldLazyLoad) {
				return this.renderLazyLoad();
			} else {
				return this.props.children;
			}
		} else {
			return this.renderLazyLoad();
		}
	}
}
