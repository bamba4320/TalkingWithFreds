import {FilterGiftsProps} from 'common/generalconsts/giftFilters.enums';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import GiftsFilterModel from 'common/models/GiftsFilter.model';
import SearchedCategoriesModel from 'common/models/SearchedCategories.model';
import Link from 'next/link';
import {Component} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Breadcrumb, Divider, Grid, Segment} from 'semantic-ui-react';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import DesktopFiltersComponent from 'UI/components/GiftsCategories/DesktopFilters.component';
import PopularCategoriesContainer from './PopularCategories.container';
import SearchedCategoriesContainer from './SearchedCategories.container';

interface IProps {
	[FilterGiftsProps.filterdGifts]: SearchedCategoriesModel[];
	[FilterGiftsProps.filters]: GiftsFilterModel;
	[FilterGiftsProps.categoryName]: string;
	areaFilters: OptionsDTO[];
	tagsFilters: OptionsDTO[];
	intl?: InjectedIntl;
	shouldLazyLoad?: boolean;
}
interface IState {}

class DesktopMainGiftsContainer extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	public render() {
		const intl = this.props.intl as InjectedIntl;
		return (
			<div className='desktop-main-gifts-container'>
				<CustomTitleComponent content={<FormattedMessage id='general.GiftsForFamilyAndFriends' />}>
					<Breadcrumb>
						<Link href='/'>
							<a>
								<Breadcrumb.Section whitesection='1'>
									<FormattedMessage id='general.nofshonit' />
								</Breadcrumb.Section>
							</a>
						</Link>
						<Breadcrumb.Divider whitedivider='1' icon='left angle' />
						<Breadcrumb.Section>{intl.formatMessage({id: 'general.GiftsForFamilyAndFriends'})}</Breadcrumb.Section>
						{this.props[FilterGiftsProps.categoryName] !== '' &&
							this.props[FilterGiftsProps.categoryName] !==
								intl.formatMessage({id: 'general.GiftsForFamilyAndFriends'}) && (
								<>
									<Breadcrumb.Divider whitedivider='1' icon='left angle' />
									<Breadcrumb.Section whitesection='1'>{this.props[FilterGiftsProps.categoryName]}</Breadcrumb.Section>
								</>
							)}
					</Breadcrumb>
				</CustomTitleComponent>
				<PopularCategoriesContainer filters={this.props[FilterGiftsProps.filters]} />
				<Segment placeholder dividerpadding='1' nomargin='1'>
					<Divider className='for-ie-divider' />
				</Segment>
				<Grid columns={2} justifycenter='1' paddingtop3rem='1'>
					<Grid.Column computer='4' largeScreen='3' widescreen='3'>
						<DesktopFiltersComponent
							filters={this.props[FilterGiftsProps.filters]}
							areaFiltersArray={this.props.areaFilters}
							tagsFiltersArray={this.props.tagsFilters}
						/>
					</Grid.Column>
					<Grid.Column computer='11' largeScreen='12' widescreen='12'>
						<SearchedCategoriesContainer
							filterdGifts={this.props[FilterGiftsProps.filterdGifts]}
							filters={this.props[FilterGiftsProps.filters]}
							shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
						/>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default withIntl(DesktopMainGiftsContainer);
