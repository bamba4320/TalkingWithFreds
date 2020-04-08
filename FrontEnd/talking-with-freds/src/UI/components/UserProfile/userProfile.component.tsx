import React from 'react';
import {Button, Icon, Image, Popup} from 'semantic-ui-react';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../BL/stores/storesKeys';
import './userProfile.component.scss';
import MoreOptionsMenuComponent from '../MoreOptionsMenu/MoreOptionsMenu.component';
import { isNullOrUndefined } from 'util';

interface IProps {
	src?:string;
}
interface IState {}

const currentUserStore = rootStores[CURRENT_USER_STORE];

export default class UserProfileComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='user-profile-inner-wrapper'>
				{/* profile picture */}
				<div className={`user-profile-img-wrapper ${!isNullOrUndefined(this.props.src) && this.props.src !== '' ? '' : 'default-image'}`}>
					<div className='circular-image-wrapper'>
						<Image className='user-profile-img' src={this.props.src || require('../../../static/images/blank_user_profile_image.jfif')} />
					</div>
				</div>
			</div>
		);
	}
}
