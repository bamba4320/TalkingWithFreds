import React from 'react';
import {Image} from 'semantic-ui-react';
import {isNullOrUndefined} from 'util';
import {imagePreURL} from '../../../../common/generalConsts';
import UserModel from '../../../../common/models/User.model';
import './AddUserToGroup.component.scss';

interface IProps {
	user: UserModel;
	onSelect: any;
	isSelected: boolean;
}
interface IState {}

export default class AddUserToGroupComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className={`add-user-wrapper ${this.props.isSelected ? 'selected' : ''}`} onClick={this.handleClick}>
				<div>
					<Image
						avatar
						src={this.setUserProfilePicture() || require('../../../../static/images/blank_user_profile_image.jfif')}
					/>
				</div>
				<div className='username'>{this.props.user.username}</div>
			</div>
		);
	}

	private handleClick = () => {
		this.props.onSelect(this.props.user);
	};

	// if the user has profile picture return it, else return null
	private setUserProfilePicture() {
		if (!isNullOrUndefined(this.props.user.profileImage)) {
			return imagePreURL + this.props.user.profileImage;
		} else {
			return null;
		}
	}
}
