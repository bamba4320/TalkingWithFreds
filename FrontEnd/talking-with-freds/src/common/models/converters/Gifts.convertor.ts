import {eStatusOfUse} from 'common/generalconsts/purchase.enums';
import {BusinessesInfoDTO} from 'common/models/DTOs/BusinessesInfo.dto';
import moment from 'moment';
import BranchModel from '../Branch.model';
import BranchMoreDetailsModel from '../BranchMoreDetails.model';
import BranchDTO from '../DTOs/Branch.dto';
import BranchMoreDetailsDTO from '../DTOs/BranchMoreDetails.dto';
import CategoryDTO from '../DTOs/Category.dto';
import GiftsFilterDTO from '../DTOs/GiftsFilter.dto';
import OptionsDTO from '../DTOs/Options.dto';
import ProductToMemberDTO from '../DTOs/ProductToMember.dto';
import {PurchaseDTO} from '../DTOs/Purchase.dto';
import ReceivedGiftDTO from '../DTOs/receivedGift.dto';
import SearchedCategoriesDTO from '../DTOs/SearchedCategories.dto';
import SendGiftDTO from '../DTOs/SendGift.dto';
import SentGiftDTO from '../DTOs/SentGift.dto';
import {VariantDTO} from '../DTOs/Variant.dto';
import GiftsFilterModel from '../GiftsFilter.model';
import ProductToMemberModel from '../ProductToMember.model';
import ReceivedGiftModel from '../ReceivedGift.model';
import SearchedCategoriesModel from '../SearchedCategories.model';
import SendGiftModel from '../SendGift.model';
import SentGiftModel from '../SentGift.model';
import {GiftsKosherFilter} from './../../generalconsts/giftFilters.enums';

export default class GiftsConverter {
	public static SentDtoToModel(sentGiftDTO: SentGiftDTO): SentGiftModel {
		const newGift: SentGiftModel = new SentGiftModel();
		newGift.categoryNumber = sentGiftDTO.categoryDetails[0] && sentGiftDTO.categoryDetails[0].categoryId;
		newGift.category = sentGiftDTO.categoryDetails[0] && sentGiftDTO.categoryDetails[0].category;
		newGift.image =
			sentGiftDTO.categoryDetails[0] &&
			sentGiftDTO.categoryDetails[0].category.images &&
			sentGiftDTO.categoryDetails[0].category.images[0];
		newGift.transferDetails = sentGiftDTO.transferDetails;
		newGift.transferDetails.sentDate = moment(sentGiftDTO.transferDetails.sentDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
		// set tranferBy to be id for reactIntl
		newGift.transferDetails.transferBy = sentGiftDTO.transferDetails.transferBy.map((trans) => {
			return `transferBy.${trans}`;
		});
		return newGift;
	}

	public static receivedDtoToModel(receivedGiftDTO: ReceivedGiftDTO): ReceivedGiftModel {
		const newGift: ReceivedGiftModel = new ReceivedGiftModel();
		newGift.categoryNumber = receivedGiftDTO.categoryDetails[0] && receivedGiftDTO.categoryDetails[0].categoryId;
		newGift.category = receivedGiftDTO.categoryDetails[0] && receivedGiftDTO.categoryDetails[0].category;
		newGift.image =
			receivedGiftDTO.categoryDetails[0] &&
			receivedGiftDTO.categoryDetails[0].category.images &&
			receivedGiftDTO.categoryDetails[0].category.images[0];
		newGift.price = receivedGiftDTO.transferDetails.price;
		newGift.transferGuid = receivedGiftDTO.transferDetails.transferGuid;
		newGift.sendFrom = receivedGiftDTO.transferDetails.sendFrom;
		newGift.expiredDate = moment(receivedGiftDTO.transferDetails.expiredDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
		newGift.sentDate = moment(receivedGiftDTO.transferDetails.sentDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
		// set status to be id for reactIntl
		switch (receivedGiftDTO.transferDetails.eStatusOfUse) {
			case eStatusOfUse.unUsed:
				newGift.status = 'status.UnUsed';
				break;
			case eStatusOfUse.used:
				newGift.status = 'status.Used';
				break;
			case eStatusOfUse.pariallyUsed:
				newGift.status = 'status.PariallyUsed';
				break;
			case eStatusOfUse.expired:
				newGift.status = 'status.Expired';
				break;
		}
		return newGift;
	}

	public static sendGiftModelToDto(model: SendGiftModel) {
		const dto: SendGiftDTO = new SendGiftDTO();
		dto.sumToLoad = model.sumToLoad;
		dto.blessing = model.blessing;
		dto.categoryNumber = model.categoryNumber;
		dto.barCode = model.variantBarCode;
		dto.fromMemberName = model.fromMemberName;
		dto.media = model.media;
		dto.toMemberEmail = model.toMemberEmail;
		dto.toMemberMobilePhone = model.toMemberMobilePhone;
		dto.toMemberName = model.toMemberName;
		dto.sendTime = model.sendDate.concat(' ' + model.sendTime);
		dto.sendTime = moment(dto.sendTime, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
		return dto;
	}

	public static sendGiftDtoToModel(dto: SendGiftDTO) {
		const model: SendGiftModel = new SendGiftModel();
		model.sumToLoad = dto.sumToLoad;
		model.blessing = dto.blessing;
		model.categoryNumber = dto.categoryNumber;
		model.fromMemberName = dto.fromMemberName;
		model.media = dto.media;
		model.toMemberEmail = dto.toMemberEmail;
		model.toMemberMobilePhone = dto.toMemberMobilePhone;
		model.toMemberName = dto.toMemberName;
		model.sendDate = moment(dto.sendTime, 'YYYY-MM-DD').format('DD/MM/YYYY');
		model.sendTime = `${moment(dto.sendTime).get('hour')}:00`;
		return model;
	}

	public static branchDtoToModel(dto: BranchDTO) {
		const model = new BranchModel();
		model.branchId = dto.branchId;
		model.businessId = parseInt(dto.businessId, 10);
		model.branchName = dto.storeName;
		model.branchLocation = dto.branchName;
		model.location = dto.location;
		model.businessPhoneNumber = dto.phone.split(',')[0];
		model.imageUrl = dto.businessLogoFile;
		model.lineOfBusiness = dto.businessAlias;
		return model;
	}

	public static branchMoreDetailsDtoToModel(dto: BranchMoreDetailsDTO) {
		const model = new BranchMoreDetailsModel();
		model.branchActivityHours = dto.openHoursText ? dto.openHoursText : model.branchActivityHours;
		model.businessWebstie = dto.website;
		model.branchLocation = dto.address;
		model.businessGeneralInformationHTML = [dto.goodToKnow];
		// model.businessGeneralInformationHTML = [...dto.goodToKnow];
		model.description = dto.description;
		model.kosherType = dto.kosherType;
		return model;
	}

	public static giftsFilterModelToDto(giftsFilterModel: GiftsFilterModel, numOfCategories: number) {
		const giftsFilterDto = new GiftsFilterDTO();
		giftsFilterDto.amountPerPage = numOfCategories;
		giftsFilterDto.pageNumber = giftsFilterModel.pageFilter;
		giftsFilterDto.priceSort = giftsFilterModel.priceSort;

		// category filter
		giftsFilterDto.categoryFirstFatherID =
			giftsFilterModel.categoryIdFilter !== '0' ? parseInt(giftsFilterModel.categoryIdFilter, 10) : undefined;

		// kosher filter
		const kts = giftsFilterModel.kosherFilter.map((f) => {
			return parseInt(f, 10);
		});
		giftsFilterDto.kosherTypes = kts.find((kt) => {
			return kt === parseInt(GiftsKosherFilter.all, 10);
		})
			? undefined
			: kts;

		// prices filter
		giftsFilterDto.priceMax = giftsFilterModel.maxPrice;
		giftsFilterDto.priceMin = giftsFilterModel.minPrice;

		// regions filter
		const rs = giftsFilterModel.areaFilter.split(',').map((a) => parseInt(a, 10));
		giftsFilterDto.regions =
			rs.find((r) => {
				return r === 0;
			}) === 0
				? undefined
				: rs;
		// tags filters
		const ts = giftsFilterModel.tagsFilter.split(',').map((a) => parseInt(a, 10));
		giftsFilterDto.categoryTagIDs = ts.find((t) => {
			return t === 0;
		})
			? undefined
			: ts;

		return giftsFilterDto;
	}

	public static searchedCategoriesDtoToModel(dto: SearchedCategoriesDTO) {
		const model = new SearchedCategoriesModel();
		const category = dto.innerFilterData.categories[0] && dto.innerFilterData.categories[0].category;
		model.businessesCount = dto.innerFilterData.businessesCount;
		model.categoryId = category.categoryId;
		model.categoryName = category.categoryName;
		model.categoryType = category.categoryType;
		model.categoryUrl = category.categoryUrl;
		model.images = category.images;
		model.maxPrice = dto.innerFilterData.categories[0] && dto.innerFilterData.categories[0].maxPrice;
		model.minPrice = dto.innerFilterData.categories[0] && dto.innerFilterData.categories[0].minPrice;
		model.categoryDescription = category.shortDescription;
		model.sortOrder = category.sortOrder;
		model.stripName = dto.stripName;
		model.categoryShowType = category.categoryShowType;
		return model;
	}

	public static purchaseDto(
		sendGiftModel: SendGiftModel,
		category: CategoryDTO,
		variant: VariantDTO,
		email: string
	): PurchaseDTO {
		const purchaseDto = new PurchaseDTO();
		const date = sendGiftModel.sendDate.concat(' ' + sendGiftModel.sendTime);
		purchaseDto.email = email;
		purchaseDto.creditCard16Digits = sendGiftModel.cardNumber;
		purchaseDto.creditCardExpirey = sendGiftModel.validityMonth + sendGiftModel.validityYear.substr(2);
		purchaseDto.cvv = sendGiftModel.cvv ? sendGiftModel.cvv.toString() : '';
		purchaseDto.identity = sendGiftModel.idNumber;
		purchaseDto.numOfPayments = 1;
		purchaseDto.pinCode = '';
		purchaseDto.cart = [];
		const cart = {
			categoryId: sendGiftModel.categoryNumber ? sendGiftModel.categoryNumber.toString() : '',
			categoryName: category.categoryName,
			variant: {
				quantity: 1,
				barCode: variant.barCode,
				loadingAmount: sendGiftModel.sumToLoad ? sendGiftModel.sumToLoad : 0,
				fromMemberName: sendGiftModel.fromMemberName ? sendGiftModel.fromMemberName : '',
				toMemberName: sendGiftModel.toMemberName ? sendGiftModel.toMemberName : '',
				toMemberEmail: sendGiftModel.toMemberEmail ? sendGiftModel.toMemberEmail : '',
				toMemberMobile: sendGiftModel.toMemberMobilePhone ? sendGiftModel.toMemberMobilePhone : '',
				sendTime: moment(date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
				// only for mail template, replace \n characters with <br/> tags
				blessing: sendGiftModel.blessing ? sendGiftModel.blessing.replace(new RegExp('\n', 'g'), '<br/>') : '',
				mediaUrl: sendGiftModel.media ? sendGiftModel.media : '',
				price: sendGiftModel.sumToLoad && sendGiftModel.sumToLoad > 0 ? sendGiftModel.sumToLoad : variant.price,
				immediateSend: sendGiftModel.isImmediateSend,
			},
		};
		purchaseDto.cart.push(cart);
		purchaseDto.totalPayment = 0;
		purchaseDto.cart.forEach((cart) => {
			purchaseDto.totalPayment += cart.variant.price;
		});
		return purchaseDto;
	}

	public static productToMemberDtoToModel(dto: ProductToMemberDTO) {
		const model = new ProductToMemberModel();
		model.blessing = dto.blessing;
		model.businessInfo = dto.businesses ? [...dto.businesses] : [];
		model.code = dto.code;
		model.fromMemberName = dto.fromMemberName;
		model.history = dto.history ? [...dto.history] : [];
		model.isUsed = dto.isUsed;
		model.logo = dto.logo;
		model.media = dto.media;
		model.productType = dto.productType;
		model.sumToLoad = dto.sumToLoad;
		model.toMemberName = dto.toMemberName;
		model.category = {...dto.category.category};
		model.eStatusOfUse = dto.eStatusOfUse;
		model.expiredDate = dto.expiredDate;
		return model;
	}

	public static BusinessInfoDtoToOptionDto(businessDto: BusinessesInfoDTO) {
		return new OptionsDTO(businessDto.aliasID ? businessDto.aliasID : 0, businessDto.aliasName);
	}
}
