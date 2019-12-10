import {CONFIGURATION_STORE, MENU_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import MenuStore from 'BL/stores/Menu.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import React, {Component, createRef, RefObject} from 'react';
import {Grid, Header, Image, Segment, Sticky} from 'semantic-ui-react';
import CustomIdLinkComponent from 'UI/components/custom/customLink/CustomIdLink.component';

interface IProps {
	[MENU_STORE]?: MenuStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	setItemOn?: any;
	setItemOff?: any;
	isSticky: boolean;
	isDesktop?: boolean;
}
interface IState {
	isSticky: boolean;
}

@inject(MENU_STORE, CONFIGURATION_STORE)
@observer
export default class CategoryDropdownContainer extends Component<IProps, IState> {
	public menuStore: MenuStore;
	public configurationStore: ConfigurationStore;
	public contextRef = createRef();
	constructor(props: Readonly<IProps>) {
		super(props);
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.state = {
			isSticky: false,
		};
	}

	public render() {
		return (
			<div ref={this.contextRef as RefObject<HTMLDivElement>} className='desktop-dropdown-container'>
				<Sticky
					context={this.contextRef}
					active={!this.props.isSticky}
					onStick={() => {
						this.setState({isSticky: true});
					}}
					onUnstick={() => {
						this.setState({isSticky: false});
					}}>
					<Segment
						className='animation-in'
						zindex1000='1'
						zeromargin='1'
						menudropdown='1'
						textaligncenter='1'
						margintop={this.state.isSticky ? '1' : null}
						onMouseEnter={() => {
							this.props.setItemOn();
						}}
						onMouseLeave={() => {
							this.menuStore.closeMenuDropdown();
							this.props.setItemOff();
						}}>
						{this.renderCategoriesHeader()}
					</Segment>
				</Sticky>
			</div>
		);
	}

	private renderCategoriesHeader() {
		const categories = this.menuStore.menuCategories.map((category) => {
			const imageFile = category.images && category.images[0] && category.images[0].file && category.images[0].file;
			return (
				<Grid.Column
					menudropdownitem='1'
					key={category.categoryId}
					widescreen={2}
					largeScreen={2}
					computer={3}
					onClick={() => {
						this.menuStore.closeMenuDropdown();
					}}>
					<div className={`${this.props.isDesktop ? 'desktop-gifts-categories' : ''}`}>
						<CustomIdLinkComponent
							pathname={routesPaths.gifts.root}
							id={category.categoryId ? category.categoryId : ''}>
							<Image
								src={imageFile ? imageFile : '/static/placeholders/image-placeholder.png'}
								size7rem='1'
								centered
								circular
							/>
							<Header
								dropdownitemheader='1'
								fontsize2p2rem='1'
								className={`${category.categoryName.length > 15 ? 'long-header' : ''}`}>
								{category.categoryName}
							</Header>
						</CustomIdLinkComponent>
					</div>
				</Grid.Column>
			);
		});
		if (categories.length === 0 && this.menuStore.getIsLoaded) {
			return (
				<Segment placeholder>
					<Header size='huge' color='grey'>
						{Lang.format('navbar.NoCategoriesFound')}
					</Header>
				</Segment>
			);
		} else {
			return <Grid columns={10}>{categories}</Grid>;
		}
	}
}
