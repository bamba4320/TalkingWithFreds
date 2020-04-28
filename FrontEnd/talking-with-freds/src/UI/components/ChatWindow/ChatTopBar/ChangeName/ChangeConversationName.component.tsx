import './ChangeConversationName.component.scss';
import React from 'react';
import {Form} from 'semantic-ui-react';

interface IProps {
	groupName?: string;
	onSubmit: any;
}
interface IState {
	newGroupName: string;
}

export default class ChangeConversationNameComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			newGroupName: this.props.groupName || '',
		};
	}

	public render() {
		return (
			<Form>
				<Form.Input
					type='text'
					placeholder='Type here group name'
					value={this.state.newGroupName}
					onChange={(e) => {
						this.setState({newGroupName: e.target.value});
					}}
				/>
				<Form.Button
					type='submit'
					content='Done'
					inverted
					color='purple'
					disabled={!(this.state.newGroupName.length > 0 && this.state.newGroupName.trim() !== '')}
					onClick={() => {
						this.props.onSubmit(this.state.newGroupName.trim());
					}}
				/>
			</Form>
		);
	}
}
