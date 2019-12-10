import {
	CONFIGURATION_STORE,
	CONTACT_STORE,
	CURRENT_USER_STORE,
	FORWORKERS_STORE,
	MESSAGES_STORE,
	MODAL_STORE,
} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import ContactUsStore from 'BL/stores/ContactUs.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import ForWorkersStore from 'BL/stores/ForWorkers.store';
import MessagesStore from 'BL/stores/Messages.store';
import ModalStore from 'BL/stores/Modal.store';
import {ContextsNames, ForWorkersMessages} from 'common/generalconsts/messages.consts';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Router, {withRouter} from 'next/router';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import CustomSlidercomponent from 'UI/components/custom/CustomSliderAndTags/CustomSlider.component';
import PartThreeComponent from 'UI/components/ForWorkers/Components/PartThree.component';
import StickyComponent from 'UI/components/ForWorkers/Components/sticky.component';
import MainLoginComponent from 'UI/components/Login/MainLogin.component';
import EditorMessageComponent from '../../components/custom/customEditorMessage/customEditorMessage.component';
import ContactFormComponent from '../../components/ForWorkers/Components/ContactForm.component';
import PartFiveComponent from '../../components/ForWorkers/Components/PartFive.component';
import PartFourComponent from '../../components/ForWorkers/Components/PartFour.component';
import PartSevenComponent from '../../components/ForWorkers/Components/PartSeven.component';
import PartSixComponent from '../../components/ForWorkers/Components/PartSix.component';
import PartTwoComponent from '../../components/ForWorkers/Components/PartTwo.component';
import TopPartComponent from '../../components/ForWorkers/Components/TopPart.component';
import {Image} from 'semantic-ui-react';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';

interface IForWorkersContainerProps {
	[CONFIGURATION_STORE]?: ConfigurationStore;
	[FORWORKERS_STORE]?: ForWorkersStore;
	[MESSAGES_STORE]?: MessagesStore;
	[CONTACT_STORE]?: ContactUsStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[MODAL_STORE]?: ModalStore;

	mobileDetect: MobileDetect;
	intl: InjectedIntl;
}

@inject(CONFIGURATION_STORE, FORWORKERS_STORE, MESSAGES_STORE, CONTACT_STORE, CURRENT_USER_STORE, MODAL_STORE)
@observer
class ForWorkersContainer extends React.Component<IForWorkersContainerProps, any> {
	private forWorkersStore: ForWorkersStore;
	private contactStore: ContactUsStore;
	private messagesStore: MessagesStore;
	private configurationStore: ConfigurationStore;
	private currentUserStore: CurrentUserStore;
	private modalStore: ModalStore;

	constructor(props: Readonly<IForWorkersContainerProps>) {
		super(props);
		this.contactStore = this.props[CONTACT_STORE] as ContactUsStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
		this.forWorkersStore = this.props[FORWORKERS_STORE] as ForWorkersStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public componentDidMount() {
		this.contactStore.getOptions();
	}

	public openRegistrationModal = () => {
		this.modalStore.openModal(
			<MainLoginComponent fromPurchase openModal={this.modalStore.openModal} closeModal={this.modalStore.closeModal} />,
			{
				title: 'login.LoginOrRegister',
				fullScreen: true,
				closeFromOutsideModal: true,
			}
		);
	};

	public renderSliderCarousel = () => {
		return (
			<div className='margin-top-bottom fluid'>
				<CustomSlidercomponent
					slidersArray={this.forWorkersStore.getSliders}
					mobileDetect={this.props.mobileDetect}
					imagesPath={this.configurationStore.configuration.imagesPath}
					enableMouseSwipe={true}
					showArrows={false}
					isPagination={true}
					isAutoPlay={true}
					isInsidePagination
					itemsToShow={1}
					autoPlaySpeed={7000}
					carouselId='forWorkers_Part8'
				/>
			</div>
		);
	};

	public bannerClick = () => {
		if (!this.currentUserStore.isNotLoggedIn) {
			Router.push(routesPaths.gifts.root);
		} else {
			this.openRegistrationModal();
		}
	};

	public render() {
		const messages = this.messagesStore.webSiteMessages[ContextsNames.EMPLOYEES_GIFTS] as ForWorkersMessages;
		const imagePlaceholder = '/static/placeholders/image-placeholder.png';

		return (
			<div className='employee-gift-container'>
				{/* -----------------------------------------------------------------------------------------   Top Part */}
				<TopPartComponent
					messages={messages}
					imagePlaceholder={imagePlaceholder}
					intl={this.props.intl}
					isLoggedIn={!this.currentUserStore.isNotLoggedIn}
				/>
				{/* -----------------------------------------------------------------------------------------   Sticky */}
				<StickyComponent
					intl={this.props.intl}
					isLoggedIn={!this.currentUserStore.isNotLoggedIn}
					openRegistrationModal={this.openRegistrationModal}
				/>
				{/* -----------------------------------------------------------------------------------------  part 1 - Banner */}
				<div className='employee-gifts-divider hide-desktop' />
				<div className='employee-gifts-banner'>
					<div onClick={() => this.bannerClick()}>
						<CustomResponsiveWrapper
							mobileDetect={this.props.mobileDetect}
							desktopComponent={
								<EditorMessageComponent extraClassName='part2_banner-desktop' message={messages.part2_banner} />
							}
							mobileComponent={
								<EditorMessageComponent extraClassName='part2_banner-mobile' message={messages.part2m_banner} />
							}
						/>
					</div>
				</div>
				{/* -----------------------------------------------------------------------------------------  part 2  - Categories*/}
				<PartTwoComponent
					messages={messages}
					imagePlaceholder={imagePlaceholder}
					forWorkersStore={this.forWorkersStore}
					imagesPath={this.configurationStore.configuration.imagesPath}
				/>
				{/* -----------------------------------------------------------------------------------------   part 3 - Tag */}
				<div className='space-40' />
				<PartThreeComponent
					mobileDetect={this.props.mobileDetect}
					imagePlaceholder={imagePlaceholder}
					imagesPath={this.configurationStore.configuration.imagesPath}
					tags={this.forWorkersStore.getTags}
				/>
				{/* -----------------------------------------------------------------------------------------   part 4 - Every Occasion*/}
				<PartFourComponent messages={messages} imagePlaceholder={imagePlaceholder} intl={this.props.intl} />
				{/* -----------------------------------------------------------------------------------------   part 5 - How To Give */}
				<PartFiveComponent messages={messages} imagePlaceholder={imagePlaceholder} intl={this.props.intl} />
				{/* -----------------------------------------------------------------------------------------   part 6 - Gifts That Are Easy To Manage*/}
				<PartSixComponent messages={messages} imagePlaceholder={imagePlaceholder} intl={this.props.intl} />
				{/* -----------------------------------------------------------------------------------------   part 7 - 30 Years Of Experience*/}
				<PartSevenComponent messages={messages} imagePlaceholder={imagePlaceholder} intl={this.props.intl} />
				{/* -----------------------------------------------------------------------------------------   part 8 - Images Slider */}
				<div>{this.renderSliderCarousel()}</div>
				{/* -----------------------------------------------------------------------------------------   bottom part - Contact Form */}
				<ContactFormComponent
					intl={this.props.intl}
					messagesStore={this.messagesStore}
					contactStore={this.contactStore}
					currentUserStore={this.currentUserStore}
				/>
			</div>
		);
	}
}

export default withRouter(ForWorkersContainer);
