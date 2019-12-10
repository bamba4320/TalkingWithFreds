import {inject} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Breadcrumb, Divider, Header} from 'semantic-ui-react';
interface ICustomHeaderAndPathComponentProps {
	pageHeader: any;
	crumbBread: {name: string; link: string}[];
	intl: InjectedIntl;
	isBenefitPage?: boolean;
}
interface ICustomHeaderAndPathComponentState {}
@inject()
class CustomHeaderAndPathComponent extends React.Component<
	ICustomHeaderAndPathComponentProps,
	ICustomHeaderAndPathComponentState
> {
	constructor(props: ICustomHeaderAndPathComponentProps) {
		super(props);
	}

	public render() {
		return (
			<div className='header-and-path-main-div'>
				<Header
					as='h1'
					className={`main-header ${this.props.isBenefitPage ? 'benefit-page-line-break' : ''}`}
					id='main-header'>
					{this.props.pageHeader}
				</Header>
				<Header.Subheader className='main-sub-header'>{this.renderBreadcrumb()}</Header.Subheader>
				<Divider className='crumb-divider' headerdivider='1' />
			</div>
		);
	}

	private renderBreadcrumb() {
		const intl = this.props.intl as InjectedIntl;
		return (
			this.props.crumbBread && (
				<Breadcrumb className='cramb-wraper'>
					<Link href='/'>
						<a>
							<Breadcrumb.Section className='crumb-part'>
								{intl.formatMessage({id: 'general.nofshonit'})}
							</Breadcrumb.Section>
						</a>
					</Link>

					{this.props.crumbBread.map((breadcrumb, index) => {
						return (
							<div className='crumb-part' key={`breadcrumb_${index}`}>
								<Breadcrumb.Divider className='crumb-divider-arrow' icon='left angle' />
								{index < this.props.crumbBread.length - 1 ? (
									<Link href={breadcrumb.link}>
										<a>
											<Breadcrumb.Section className='crumb-part'>{breadcrumb.name}</Breadcrumb.Section>
										</a>
									</Link>
								) : (
									<Breadcrumb.Section className='crumb-part'>{breadcrumb.name}</Breadcrumb.Section>
								)}
							</div>
						);
					})}
				</Breadcrumb>
			)
		);
	}
}
export default withIntl(CustomHeaderAndPathComponent);
