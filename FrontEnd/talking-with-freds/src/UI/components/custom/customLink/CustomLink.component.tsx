import {LinkType} from 'common/generalconsts/custom.enums';
import Link from 'next/link';
import React from 'react';
import {Header} from 'semantic-ui-react';
interface IProps {
	value?: any;
	to: string;
	linkType?: LinkType;
	classNameVal?: string;
	openNewTab?: boolean;
}

export default class CustomLinkComponent extends React.Component<IProps> {
	public render() {
		// *changed properties to be undefined on false, so they won't effect the component.
		return (
			<Link href={this.props.to ? this.props.to : ''}>
				<a target={this.props.openNewTab ? '_blank' : ''}>
					<Header.Subheader
						margintop5px={this.props.linkType === LinkType.primary ? 'true' : undefined}
						primarylink={this.props.linkType === LinkType.primary ? 'true' : undefined}
						regularlink={this.props.linkType === LinkType.regular ? 'true' : undefined}
						navbarlink={this.props.linkType === LinkType.navbarLink ? 'true' : undefined}
						subheader-mt0='1'
						className={this.props.classNameVal ? this.props.classNameVal : undefined}>
						{this.props.value ? this.props.value : ''}
					</Header.Subheader>
				</a>
			</Link>
		);
	}
}
