import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import rootStores from '../../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';

interface IProps {
	onSubmit: any;
	onChangePassword: any;
}
interface IState {
	username: string;
}

const currentUserStore = rootStores[CURRENT_USER_STORE];
export default class UpdateProfileFormComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			username: !isNullOrUndefined(currentUserStore.getCurrentUserUsername)
				? currentUserStore.getCurrentUserUsername
				: '',
		};
	}

	public render() {
		return (
			<Form>
				<Form.Field>
					<Form.Input
						type='text'
						placeholder='Username'
						value={this.state.username}
						onChange={(e) => {
							this.setState({username: e.target.value});
						}}
					/>
					<Form.Input type='file' accept='.jpg,.jpeg,.png,.jfif' />
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
						this.props.onSubmit();
					}}
				/>
			</Form>
		);
	}
}
