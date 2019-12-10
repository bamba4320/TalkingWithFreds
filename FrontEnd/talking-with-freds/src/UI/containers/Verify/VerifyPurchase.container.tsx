import {AUTH_STORE, CURRENT_USER_STORE, MODAL_STORE, PURCHASE_STORE, UI_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import ModalStore from 'BL/stores/Modal.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import UiStore from 'BL/stores/Ui.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import {ErrorValidate} from 'common/errorHandling/ErrorTypes/ErrorValidate';
import {PageToRender} from 'common/generalconsts/purchase.enums';
import GiftsConverter from 'common/models/converters/Gifts.convertor';
import SendGiftDTO from 'common/models/DTOs/SendGift.dto';
import SendGiftModel from 'common/models/SendGift.model';
import {getQueryParam} from 'common/routes/historyUtils';
import {routesPaths} from 'common/routes/routesPaths.consts';
import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import {inject, observer} from 'mobx-react';
import Router, {SingletonRouter, withRouter} from 'next/router';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import RegisterContainer from '../Register/Register.container';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	[UI_STORE]?: UiStore;
	[MODAL_STORE]?: ModalStore;
	[PURCHASE_STORE]?: PurchaseStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	router: SingletonRouter;
	intl: InjectedIntl;
}

export interface IState {}

@inject(AUTH_STORE, UI_STORE, MODAL_STORE, PURCHASE_STORE, CURRENT_USER_STORE)
@observer
class VerifyPurchaseContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	private uiStore: UiStore;
	private modalStore: ModalStore;
	private purchaseStore: PurchaseStore;
	private currentUserStore: CurrentUserStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
	}

	public componentDidMount() {
		this.uiStore.showBlockUiLoadingPopUp();

		this.authStore
			.handleVerifyPurchase(getQueryParam(this.props.router, 'tokenCode') as string)
			.then(async (verificationData: SendGiftDTO | undefined) => {
				if (verificationData) {
					const model: SendGiftModel = GiftsConverter.sendGiftDtoToModel(verificationData);
					this.purchaseStore.setSendGiftModel(model);
					this.purchaseStore.setVariant(verificationData.productsVarFromBarcode);
					await this.purchaseStore.fetchCategory(!this.currentUserStore.isNotLoggedIn);
					this.uiStore.closeBlockUiLoadingPopUp();
					AlertUtils.showGeneralSuccessPopUp(
						this.props.intl.formatMessage({id: 'verifyPurchase.SuccessVarification'}),
						false,
						() => {
							this.purchaseStore.setPageToRender(PageToRender.payment);
							const categoryId: number = verificationData.categoryNumber;
							NofhonitCookies.savePurchase(categoryId.toString());
							Router.push(
								{pathname: routesPaths.purchase.root, query: {categoryId}},
								`${routesPaths.purchase.root}/${categoryId}`
							);
						}
					);
				}
				this.setState({loading: false});
			})
			.catch((err: ApiError | ErrorValidate) => {
				this.uiStore.closeBlockUiLoadingPopUp();
				if (err instanceof ErrorValidate) {
					AlertUtils.checkApiErrorAndShowPopUp(
						err,
						this.props.intl.formatMessage({id: 'verifyPurchase.MailVarificationError'}),
						false,
						() => {
							Router.push(routesPaths.root); // moving to home page.
							this.openRegisterModal(); // opening register modal.
							AlertUtils.showInformationalPopUp(
								this.props.intl.formatMessage({id: 'varifyUser.signupRequeired'}),
								false
							);
						}
					);
				} else {
					AlertUtils.checkApiErrorAndShowPopUp(err, undefined, undefined, () => {
						Router.push(routesPaths.root); // moving to home page.
					});
				}
			});
	}

	public render() {
		return <></>;
	}

	private openRegisterModal = () => {
		this.modalStore.openModal(<RegisterContainer fromPurchase />, {title: 'register.RegisterWithEmail'});
	};
}
export default withRouter(withIntl(VerifyPurchaseContainer));
