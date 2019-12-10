import {TagsContext} from 'common/generalconsts/custom.enums';
import {timeOptions} from 'common/generalconsts/purchase.consts';
import {PageToRender} from 'common/generalconsts/purchase.enums';
import BenefitPageModel from 'common/models/BenefitPage.model';
import CategoryConverter from 'common/models/converters/Category.convertor';
import GiftsConverter from 'common/models/converters/Gifts.convertor';
import BlessingDTO from 'common/models/DTOs/Blessing.dto';
import BlessingMediaDTO from 'common/models/DTOs/BlessingMedia.dto';
import CategoryDTO from 'common/models/DTOs/Category.dto';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import ProductToMemberDTO from 'common/models/DTOs/ProductToMember.dto';
import {PurchaseDTO} from 'common/models/DTOs/Purchase.dto';
import {PurchaseConfirmationDTO} from 'common/models/DTOs/PurchaseConfirmation.dto';
import TagDTO from 'common/models/DTOs/Tag.dto';
import {VariantDTO} from 'common/models/DTOs/Variant.dto';
import ProductToMemberModel from 'common/models/ProductToMember.model';
import SendGiftModel from 'common/models/SendGift.model';
import CardsFetcher from 'Infrastructure/fetchers/Cards.fetcher';
import CategoriesFetcher from 'Infrastructure/fetchers/Categories.fetcher';
import MediaFetcher from 'Infrastructure/fetchers/Media.fetcher';
import OrderFetcher from 'Infrastructure/fetchers/Order.fetcher';
import TagsFetcher from 'Infrastructure/fetchers/Tags.fetcher';
import UsersFetcher from 'Infrastructure/fetchers/Users.fetcher';
import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import {action, computed, IObservableArray, observable} from 'mobx';
import moment from 'moment';

export default class PurchaseStore {
	@observable
	private sendGiftModel: SendGiftModel = new SendGiftModel();

	@observable
	private category: BenefitPageModel = new BenefitPageModel();

	@observable
	private variant: VariantDTO = new VariantDTO();

	@observable
	private blessings: IObservableArray<BlessingDTO> = observable([]);

	@observable
	private blessingOptions: IObservableArray<OptionsDTO> = observable([]);

	@observable
	private blessingsMedia: IObservableArray<BlessingMediaDTO> = observable([]);

	@observable
	private searchMediaText: string = '';

	@observable
	private pageToRender: PageToRender = PageToRender.sendGift;

	@observable
	private productToMember: ProductToMemberModel = new ProductToMemberModel();

	@observable
	private purchaseConfirmation: PurchaseConfirmationDTO = new PurchaseConfirmationDTO();

	@observable
	private topTag: TagDTO = new TagDTO();

	private monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

	constructor(giftsInitData?: PurchaseStore) {
		if (giftsInitData) {
			this.productToMember = giftsInitData.productToMember ? giftsInitData.productToMember : new ProductToMemberModel();
			this.blessings = giftsInitData.blessings ? giftsInitData.blessings : observable([]);
			this.blessingOptions = giftsInitData.blessingOptions ? giftsInitData.blessingOptions : observable([]);
			this.blessingsMedia = giftsInitData.blessingsMedia ? giftsInitData.blessingsMedia : observable([]);
			this.topTag = giftsInitData.topTag ? giftsInitData.topTag : new TagDTO();
		}
	}

	@computed
	public get getSendGiftModel() {
		return this.sendGiftModel;
	}

	@computed
	public get getCategory() {
		return this.category;
	}

	@computed
	public get getVariant() {
		return this.variant;
	}

	@computed
	public get getPageToRender() {
		return this.pageToRender;
	}

	@computed
	public get getTags() {
		return this.topTag;
	}

	@computed
	public get getBlessings() {
		return this.blessings;
	}

	@computed
	public get getBlessingOptions() {
		return this.blessingOptions;
	}

	@computed
	public get getBlessingsMedia() {
		return this.blessingsMedia;
	}

	@computed
	public get getSearchText() {
		return this.searchMediaText;
	}

	@computed
	public get getImageUrl() {
		return this.sendGiftModel.media;
	}

	@computed
	public get getPurchaseConfirmation() {
		return this.purchaseConfirmation;
	}

	@computed
	public get getTimeOptions() {
		const dateAndTimeArray = moment()
			.format('DD/MM/YYYY HH:mm')
			.split(' ');
		const currDate = dateAndTimeArray[0];
		return timeOptions.map((timeString, index) => {
			return new OptionsDTO(
				index,
				timeString,
				this.sendGiftModel.sendDate === currDate && moment().get('hour') >= index
			);
		});
	}

	@computed
	public get getMonthOptions() {
		return this.monthOptions.map((timeString, index) => {
			return new OptionsDTO(
				index,
				timeString,
				parseInt(this.sendGiftModel.validityYear, 10) === moment().get('year') && moment().get('month') > index
			);
		});
	}

	@computed
	public get getYearOptions() {
		const arrayOptions = [];
		const currentYear: number = moment().get('year');
		for (let i = 0; i < 7; i++) {
			arrayOptions.push(new OptionsDTO(i, (currentYear + i).toString()));
		}
		return arrayOptions;
	}

	@computed
	public get getProductToMember() {
		return this.productToMember;
	}

	@action
	public async getVerifonCode(orderGuid: string) {
		try {
			return await CardsFetcher.getVerifone(orderGuid);
		} catch (e) {
			throw e;
		}
	}

	@action
	public async fetchTopTag() {
		try {
			this.topTag = await TagsFetcher.getTopTag(TagsContext.VALIDATE_PURCHASE);
		} catch (err) {}
	}

	@action
	public setPageToRender(pageToRender: PageToRender) {
		this.pageToRender = pageToRender;
		window.scrollTo(0, 0);
	}

	@action
	public setSumToLoad(sumToLoad: number) {
		this.sendGiftModel.sumToLoad = sumToLoad;
	}

	@action
	public setIsOpen(isOpen: boolean) {
		this.sendGiftModel.isOpen = isOpen;
	}

	@action
	public async handleVariant(benefitPage: BenefitPageModel, variant: VariantDTO) {
		await NofhonitCookies.savePurchase(benefitPage.categoryId.toString());
		this.sendGiftModel = new SendGiftModel();
		await this.setCategory(benefitPage);
		await this.setVariant(variant);
		await this.setCategoryNumber();
		this.pageToRender = PageToRender.sendGift;
	}
	@action
	public async handlePurchase(email: string) {
		try {
			const categoryDto: CategoryDTO = CategoryConverter.BenefitModelToDto(this.category);
			const purchaseDto: PurchaseDTO = await GiftsConverter.purchaseDto(
				this.sendGiftModel,
				categoryDto,
				this.variant,
				email
			);
			this.purchaseConfirmation = await OrderFetcher.purchase(purchaseDto);
			this.setPageToRender(PageToRender.submit);
		} catch (e) {
			throw e;
		}
	}

	@action
	public getBlessingsMediaByName(mediaCategoryName: string) {
		return this.blessingsMedia.find((mediaDto: BlessingMediaDTO) => {
			return mediaDto.mediaCategoryName === mediaCategoryName; // check with gal
		});
	}

	@action
	public getBlessingCategoryNameByBlessingCategoryValue(blessingCategoryValue: number) {
		return this.blessings[blessingCategoryValue - 1].blessingCategoryName;
	}

	@action
	public getBlessingsOptions(blessingCategoryValue: number): [{blessingText: string; length: number}] {
		return this.blessings[blessingCategoryValue - 1].blessings;
	}

	@action
	public async fetchBlessings() {
		if (this.blessings.length === 0) {
			try {
				const blessings = await MediaFetcher.getBlessing();
				await this.blessings.replace(blessings);
				const optionsArray = this.getBlessings.map((blessingDto, index) => {
					return new OptionsDTO(index + 1, blessingDto.blessingCategoryName);
				});
				this.blessingOptions.replace(optionsArray);
			} catch (err) {
				console.error(err);
			}
		}
	}

	@action
	public async fetchBlessingMedia() {
		if (this.blessingsMedia.length === 0) {
			await this.blessingsMedia.replace(await MediaFetcher.getMediaForBlessings());
		}
	}

	@action
	public setSendGiftModel(model: SendGiftModel) {
		this.sendGiftModel = {...model};
	}

	@action
	public setIsImmediateSend(isImmediateSend: boolean) {
		let now: moment.Moment = moment();
		if (!isImmediateSend) {
			now = moment()
				.add(1, 'h')
				.startOf('hour');
		}
		const dateAndTimeArray = now.format('DD/MM/YYYY HH:mm').split(' ');
		const time = dateAndTimeArray[1];
		this.sendGiftModel.sendTime = time;
		this.sendGiftModel.sendTimeValue = now.get('hour');
		this.sendGiftModel.isImmediateSend = isImmediateSend;
	}

	@action
	public async fetchCategory(isLoggedIn: boolean) {
		const fetchedCategory: CategoryDTO = await CategoriesFetcher.GetCategoryPage(
			this.sendGiftModel.categoryNumber,
			isLoggedIn
		);
		this.category = CategoryConverter.DtoToBenefitModel(fetchedCategory);
	}

	@action
	public setSearchText(text: string) {
		this.searchMediaText = text;
	}

	@action
	public setImageUrl(url: string) {
		this.sendGiftModel.media = url;
	}

	@action
	public setSendDateAndTime(dateAndTime: moment.Moment) {
		const dateAndTimeArray = dateAndTime.format('DD/MM/YYYY HH:mm').split(' ');
		const date = dateAndTimeArray[0];
		const time = dateAndTimeArray[1];
		this.sendGiftModel.sendDate = date;
		this.sendGiftModel.sendTime = time;
		this.sendGiftModel.sendTimeValue = dateAndTime.get('hour');
	}

	@action
	public setCategoryNumber() {
		this.sendGiftModel.categoryNumber = this.category.categoryId;
	}

	@action
	public async setCategory(category: BenefitPageModel) {
		this.category = category;
	}

	@action
	public setVariant(variant: VariantDTO) {
		this.variant = variant;
		this.sendGiftModel.variantBarCode = this.variant.barCode;
	}

	@action
	public async fetchProductToMember(orderGuild: string) {
		try {
			const dto: ProductToMemberDTO = await UsersFetcher.getProductToMember(orderGuild);
			this.productToMember = GiftsConverter.productToMemberDtoToModel(dto);
			this.productToMember.orderGuid = orderGuild;
		} catch (e) {
			console.error(e);
		}
	}
}
