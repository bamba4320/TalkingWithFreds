import TagDTO from 'common/models/DTOs/Tag.dto';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Container, Header, Image, Segment} from 'semantic-ui-react';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import CustomCarousel from '../customCarousel/CustomCarousel.component';
import CustomIdLinkComponent from '../customLink/CustomIdLink.component';
interface IProps {
	tags: TagDTO;
	imagesPath: string;
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
}

class CustomTagscomponent extends React.Component<IProps> {
	public render() {
		return (
			<div className='top-tag-div'>
				<CustomResponsiveWrapper
					desktopComponent={this.renderCaousel(true)}
					mobileComponent={this.renderCaousel(false)}
					mobileDetect={this.props.mobileDetect}
				/>
				<Container textAlign='center' className='btn-container'>
					<Link href={routesPaths.gifts.root}>
						<a>
							<Button primary circular className='all-btn'>
								{this.props.intl.formatMessage({id: 'gifts.toAllDills'})}
							</Button>
						</a>
					</Link>
				</Container>
			</div>
		);
	}
	public renderCaousel(isDesktop: boolean) {
		const carouselBreakPoints = [
			{width: 1, itemsToShow: 1.5},
			{width: 560, itemsToShow: 2.5},
			{width: 740, itemsToShow: 3.2},
			{width: 1024, itemsToShow: 2},
			{width: 1250, itemsToShow: 3},
		];
		const extraClassName: string = isDesktop ? '' : ' mobile-top-tag';
		return (
			<Segment placeholder rowflexsegment='1' className={'top-tag-segment' + extraClassName}>
				<CustomCarousel
					carouselId='tags'
					enableMouseSwipe={!isDesktop}
					showArrows={isDesktop}
					isPagination={isDesktop}
					itemsToShow={1}
					isAutoPlay={false}
					breakPoints={carouselBreakPoints}>
					{this.tagsMapping()}
				</CustomCarousel>
			</Segment>
		);
	}
	public tagsMapping = () => {
		const renderArray = this.props.tags && this.props.tags.tagCategoryInfo ? this.props.tags.tagCategoryInfo : [];
		if (renderArray) {
			return renderArray.map((category) => {
				return (
					<Segment placeholder key={category.categoryId}>
						<CustomIdLinkComponent
							pathname={routesPaths.giftPage.root}
							id={category.categoryId ? category.categoryId : ''}>
							<Image
								automargin='1'
								circular
								alt={
									category.categories.images && category.categories.images.length > 0 && category.categories.images[0]
										? category.categories.images[0].alt
										: ''
								}
								className='tag-image'
								src={
									category.categories.images && category.categories.images.length > 0 && category.categories.images[0]
										? `${this.props.imagesPath}${category.categories.images[0].file}`
										: '/static/placeholders/image-placeholder.png'
								}
							/>
						</CustomIdLinkComponent>
						<Header as='h2' className='tag-header'>
							{category.categories.categoryName}
							<Header.Subheader blackheader='1'>{category.categories.shortDescription}</Header.Subheader>
						</Header>
					</Segment>
				);
			});
		}
	};
}
export default withIntl(CustomTagscomponent);
