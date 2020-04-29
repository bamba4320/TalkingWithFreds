import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import rootStores from '../../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';
import './updateProfileForm.component.scss';
import ProfileImageSelectionDisplayContainer from '../../../containers/ProfileImagesSelectionDisplay/ProfileImagesSelectionDisplay.container';

interface IProps {
	onSubmit: any;
	onChangePassword: any;
}
interface IState {
	username: string;
	selectedImageNumber: number;
}

const currentUserStore = rootStores[CURRENT_USER_STORE];
export default class UpdateProfileFormComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			username: !isNullOrUndefined(currentUserStore.getCurrentUserUsername)
				? currentUserStore.getCurrentUserUsername
				: '',
			selectedImageNumber: 0,
		};
	}

	public render() {
		return (
			<Form className='form-wrapper'>
				<Form.Field>
					<Form.Input
						type='text'
						placeholder='Username'
						value={this.state.username}
						onChange={(e) => {
							this.setState({username: e.target.value});
						}}
					/>
					<ProfileImageSelectionDisplayContainer
						isUser={true}
						onSelect={(selectedNumber: number) => {
							this.setState({selectedImageNumber: selectedNumber});
						}}
					/>
					<Button
						inverted
						color='purple'
						type='button'
						content='Change Password'
						onClick={() => this.props.onChangePassword()}
					/>
				</Form.Field>
				<Button
					inverted
					color='blue'
					type='submit'
					content='Submit'
					onClick={() => {
						this.props.onSubmit(this.state.username, this.state.selectedImageNumber);
					}}
				/>
			</Form>
		);
	}
}
