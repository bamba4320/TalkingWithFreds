import React from 'react';
import './userProfile.component.scss';
import {Image} from 'semantic-ui-react';

interface IProps {}
interface IState {}

export default class UserProfileComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='user-profile-inner-wrapper'>
				<div className='user-profile-img-wrapper'>
					<div className='circular-image-wrapper'>
						<Image className='user-profile-img' src={require('../../../static/images/appaProfilePicture.jpg')} />
					</div>
				</div>
			</div>
		);
	}
}
