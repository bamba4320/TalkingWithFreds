import {AUTH_STORE, MESSAGES_STORE, UI_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import MessagesStore from 'BL/stores/Messages.store';
import UiStore from 'BL/stores/Ui.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import UserModel from 'common/models/User.model';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Grid} from 'semantic-ui-react';
import UpdatePasswordComponent from 'UI/components/passwords/UpdatePassword.component';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	[UI_STORE]?: UiStore;
	[MESSAGES_STORE]?: MessagesStore;
	closeModal?: any;
	token?: string;
	intl: InjectedIntl;
}

export interface IState {}

@inject(AUTH_STORE, UI_STORE, MESSAGES_STORE)
@observer
class UpdatePasswordContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	private uiStore: UiStore;
	private messageStore: MessagesStore;

	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.messageStore = this.props[MESSAGES_STORE] as MessagesStore;
	}

	public render() {
		const message: string =
			this.messageStore.webSiteMessages.auth && this.messageStore.webSiteMessages.auth.duplicateErrorMessage.messageText
				? this.messageStore.webSiteMessages.auth.duplicateErrorMessage.messageText
				: Lang.format('errors.MustBeDifferent');
		return (
			<Grid padded>
				<Grid.Column paddingsides80='1' computer={16} only='computer'>
					<UpdatePasswordComponent onSubmitRequest={this.onFormSubmitRequest} duplicateErrorMessage={message} />
				</Grid.Column>
				<Grid.Column mobile={16} tablet={16} only='mobile tablet'>
					<UpdatePasswordComponent onSubmitRequest={this.onFormSubmitRequest} duplicateErrorMessage={message} />
				</Grid.Column>
			</Grid>
		);
	}

	private onFormSubmitRequest = async (values: {password: string; newPassword: string}) => {
		try {
			this.uiStore.blockUiSite();
			const userModel: UserModel = await this.authStore.handleUpdatePassword(
				values.password,
				values.newPassword,
				this.props.token
			);

			if (userModel) {
				await AlertUtils.showGeneralSuccessPopUp(
					this.props.intl.formatMessage({id: 'AlertUtils.PasswordUpdateSuccessMessage'})
				);
				this.props.closeModal();
			}
		} catch (err) {
			AlertUtils.checkApiErrorAndShowPopUp(err);
		} finally {
			this.uiStore.unblockUiSite();
		}
	};
}
export default withIntl(UpdatePasswordContainer);
