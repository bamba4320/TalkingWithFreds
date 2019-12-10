import SliderDTO from 'common/models/DTOs/Slider.dto';
import Link from 'next/link';
import React from 'react';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import {isNullOrUndefined} from 'util';
import CustomCarousel from '../customCarousel/CustomCarousel.component';
interface IProps {
	carouselId: string; // this is for the unique id of the carousel
	slidersArray: SliderDTO[];
	imagesPath: string;
	mobileDetect: MobileDetect;
	enableMouseSwipe?: boolean;
	showArrows?: boolean;
	isPagination?: boolean;
	isInsidePagination?: boolean;
	itemsToShow?: number;
	isAutoPlay?: boolean;
	autoPlaySpeed?: number;
}

export default class CustomSlidercomponent extends React.Component<IProps> {
	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={this.renderCarousel(false)}
				mobileComponent={this.renderCarousel(true)}
			/>
		);
	}

	public renderCarousel(isMobile: boolean) {
		return (
			<CustomCarousel
				carouselId={`${this.props.carouselId}_slider`}
				slider // Sets carousel width to 100%
				enableMouseSwipe={this.props.enableMouseSwipe ? this.props.enableMouseSwipe : false}
				isInsidePagination={this.props.isInsidePagination ? this.props.isInsidePagination : false}
				showArrows={this.props.showArrows ? this.props.showArrows : false}
				itemsToShow={this.props.itemsToShow ? this.props.itemsToShow : 1}
				isAutoPlay={this.props.isAutoPlay ? this.props.isAutoPlay : false}
				isPagination={this.props.isPagination ? this.props.isPagination : false}
				infinite
				autoPlaySpeed={this.props.autoPlaySpeed ? this.props.autoPlaySpeed : 3000}>
				{this.renderAllImges(isMobile)}
			</CustomCarousel>
		);
	}

	public renderSlider(key: number, alt: string, img: string, link?: string) {
		return (
			<div key={key} className='carousel-slider-item'>
				<Link href={link}>
					<a target='_blank'>
						<img alt={alt} src={`${this.props.imagesPath}${img}`} />
					</a>
				</Link>
			</div>
		);
	}
	public renderAllImges(isMobile: boolean) {
		return (
			this.props.slidersArray &&
			this.props.slidersArray
				.filter((img: SliderDTO) => {
					return (!isMobile && img.imageUrlBig) || (isMobile && img.imageUrlSmall);
				})
				.map((img: SliderDTO, index) => {
					if (!isNullOrUndefined(img.imageUrlBig) && !isNullOrUndefined(img.imageUrlSmall)) {
						if (isMobile) {
							return this.renderSlider(index, img && img.alt ? img.alt : '', img.imageUrlSmall, img.link);
						} else {
							return this.renderSlider(index, img && img.alt ? img.alt : '', img.imageUrlBig, img.link);
						}
					} else if (!isMobile && !isNullOrUndefined(img.imageUrlBig)) {
						return this.renderSlider(index, img && img.alt ? img.alt : '', img.imageUrlBig, img.link);
					} else if (isMobile && !isNullOrUndefined(img.imageUrlSmall)) {
						return this.renderSlider(index, img && img.alt ? img.alt : '', img.imageUrlSmall, img.link);
					} else {
						return null;
					}
				})
		);
	}
}
