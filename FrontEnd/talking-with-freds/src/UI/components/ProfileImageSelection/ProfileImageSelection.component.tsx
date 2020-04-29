import './ProfileImageSelection.component.scss';
import React from 'react';
import ImageModel from '../../../common/models/Image.model';
import {Image} from 'semantic-ui-react';
import {imagePreURL} from '../../../common/generalConsts';
import {isNullOrUndefined} from 'util';
import {observe} from 'mobx';
import {observer} from 'mobx-react';

interface IProps {
	onSelection: any;
	isSelected: any;
	imageModel: ImageModel;
}
interface IState {}

@observer
export default class ProfileImageSelectionComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div
				className={`image-wrapper ${this.props.isSelected ? 'selected' : ''}`}
				onClick={() => {
					this.props.onSelection(this.props.imageModel.imageNumber || 0);
				}}>
				<Image
					avatar
					src={
						!isNullOrUndefined(this.props.imageModel.imagePath)
							? imagePreURL + this.props.imageModel.imagePath
							: require('../../../static/images/blank_user_profile_image.jfif')
					}
				/>
			</div>
		);
	}
}
