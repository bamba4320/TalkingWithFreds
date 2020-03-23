import React from 'react';
import {Button, Icon, Image, Popup} from 'semantic-ui-react';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../BL/stores/storesKeys';
import './userProfile.component.scss';

interface IProps {}
interface IState {}

const currentUserStore = rootStores[CURRENT_USER_STORE];

export default class UserProfileComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='user-profile-inner-wrapper'>
				{/* profile picture */}
				<div className='user-profile-img-wrapper'>
					<div className='circular-image-wrapper'>
						<Image className='user-profile-img' src={require('../../../static/images/appaProfilePicture.jpg')} />
					</div>
				</div>

				{/* New Group and menu  */}
				<div>
					<Popup
						trigger={<Icon name='plus' size='big' />}
						content={
							<div>
								<Button
									inverted
									color='red'
									onClick={() => {
										currentUserStore.logout();
									}}>
									Logout
								</Button>
							</div>
						}
						hoverable
					/>
				</div>
			</div>
		);
	}
}
