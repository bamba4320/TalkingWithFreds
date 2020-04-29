import {observable, action, computed} from 'mobx';
import ImageModel from '../../common/models/Image.model';
import ImagesFetcher from '../../Infrastructure/fetchers/Images.fetcher';

export default class ImageStore {
	@observable
	private userProfileImages: ImageModel[];
	@observable
	private conversationImages: ImageModel[];

	constructor() {
		this.userProfileImages = [];
		this.conversationImages = [];
		this.initImages();
	}

	@action
	private async initImages() {
		const tempAllImages = await this.getAllImagesFromAPI();
		this.userProfileImages = tempAllImages.user;
		this.conversationImages = tempAllImages.conversations;
	}

	@action
	private async getUserImagesFromAPI() {
		this.userProfileImages = await ImagesFetcher.getUserImages();
	}

	@action
	private async getConversationImagesFromAPI() {
		this.conversationImages = await ImagesFetcher.getConversationImages();
	}

	@action
	private async getAllImagesFromAPI() {
		return await ImagesFetcher.getAllImages();
	}

	// find image
	public findImage(imageNumber: number) {
		// search in user profile images
		let imageIndex = this.userProfileImages.findIndex((imageModel: ImageModel) => {
			return imageModel.imageNumber === imageNumber;
		});

		// if found, return
		if (imageIndex !== -1) {
			return this.userProfileImages[imageIndex];
		} else {
			// is not exists, search in conversation images
			imageIndex = this.conversationImages.findIndex((imageModel: ImageModel) => {
				return imageModel.imageNumber === imageNumber;
			});
			// if found
			if (imageIndex !== -1) {
				return this.conversationImages[imageIndex];
			}
		}
		// if not found

		return this.conversationImages[0];
	}

	@computed
	get getUserProfileImages() {
		return this.userProfileImages;
	}

	@computed
	get getConversationImages() {
		return this.conversationImages;
	}
}
