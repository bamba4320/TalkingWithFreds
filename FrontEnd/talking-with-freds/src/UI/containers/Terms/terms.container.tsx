import {MESSAGES_STORE} from 'BL/stores';
import MessagesStore from 'BL/stores/Messages.store';
import {ContextsNames, TermsMessages} from 'common/generalconsts/messages.consts';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Breadcrumb, Container, Header, Image} from 'semantic-ui-react';
import EditorMessageComponent from 'UI/components/custom/customEditorMessage/customEditorMessage.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';

export interface ITermsPageProps {
	mobileDetect: MobileDetect;
	[MESSAGES_STORE]: MessagesStore;
	intl: InjectedIntl;
}

export interface ITermsPageState {}

@inject(MESSAGES_STORE)
@observer
class TermsContainer extends React.Component<ITermsPageProps, ITermsPageState> {
	private messagesStore: MessagesStore;

	constructor(props: ITermsPageProps) {
		super(props);
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
	}

	public render() {
		const intl = this.props.intl as InjectedIntl;
		const termsMessages: TermsMessages = this.messagesStore.webSiteMessages[ContextsNames.REGULATIONS] as TermsMessages;
		const termsText = termsMessages ? termsMessages.Regulations : null;
		return (
			<div className='terms-mobile-main-container'>
				<CustomResponsiveWrapper
					mobileDetect={this.props.mobileDetect}
					desktopComponent={
						<div className='terms-desktop-wrapper'>
							<CustomTitleComponent content={intl.formatMessage({id: 'terms.title'})}>
								<Breadcrumb>
									<Link href='/'>
										<a>
											<Breadcrumb.Section whitesection='1'>
												<FormattedMessage id='general.nofshonit' />
											</Breadcrumb.Section>
										</a>
									</Link>
									<Breadcrumb.Divider whitedivider='1' icon='left angle' />
									<Breadcrumb.Section>{intl.formatMessage({id: 'terms.title'})}</Breadcrumb.Section>
								</Breadcrumb>
							</CustomTitleComponent>
							<Image className='desktop-background-image' src='/static/images/regulations.jpg' />
							<div className='desktop-editor-message'>
								<EditorMessageComponent message={termsText} />
							</div>
						</div>
					}
					mobileComponent={
						<div className='mobile-terms-header-div'>
							<Image className='mobile-background-image' src='/static/images/regulations.jpg' />
							<Container fluid className='main-mobile-container'>
								<Header as='h2' className='terms-title'>
									{intl.formatMessage({id: 'terms.title'})}
								</Header>
								<EditorMessageComponent message={termsText} />
							</Container>
						</div>
					}
				/>
			</div>
		);
	}
}

export default withIntl(TermsContainer);
