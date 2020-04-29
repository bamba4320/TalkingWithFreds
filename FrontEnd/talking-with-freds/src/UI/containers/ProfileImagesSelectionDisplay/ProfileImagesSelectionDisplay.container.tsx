import './ProfileImagesSelectionDisplay.container.scss';
import React from 'react';
import ImageModel from '../../../common/models/Image.model';
import ProfileImageSelectionComponent from '../../components/ProfileImageSelection/ProfileImageSelection.component';
import rootStores from '../../../BL/stores';
import {IMAGES_STORE} from '../../../BL/stores/storesKeys';
import {observer} from 'mobx-react';

interface IProps {
	isUser: boolean;
	onSelect: any;
}
interface IState {
	imagesArray: ImageModel[];
	selectedImageNumber: number;
}

const imagesStore = rootStores[IMAGES_STORE];

@observer
export default class ProfileImageSelectionDisplayContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			imagesArray: [],
			selectedImageNumber: 0,
		};
	}

	public componentDidMount() {
		this.props.isUser
			? this.setState({imagesArray: imagesStore.getUserProfileImages})
			: this.setState({imagesArray: imagesStore.getConversationImages});
	}

	public render() {
		return (
			<div className='image-selection-wrapper'>
				<div className='title-text'>{this.props.isUser ? 'Select Profile Picture:' : 'Select Group Picture:'}</div>
				<div className='images-wrapper'>{this.renderImages()}</div>
			</div>
		);
	}

	private renderImages() {
		return this.state.imagesArray.map((image: ImageModel) => {
			return (
				<ProfileImageSelectionComponent
					imageModel={image}
					isSelected={this.isSelected(image.imageNumber || 0)}
					onSelection={this.onImageSelect}
				/>
			);
		});
	}

	private onImageSelect = (imageNumber: number) => {
		this.props.onSelect(imageNumber);
		this.setState({selectedImageNumber: imageNumber});
	};

	private isSelected = (imageNumber: number) => {
		return this.state.selectedImageNumber === imageNumber;
	};
}
