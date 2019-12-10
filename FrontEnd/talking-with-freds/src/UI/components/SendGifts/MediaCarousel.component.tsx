import BlessingMediaDTO from 'common/models/DTOs/BlessingMedia.dto';
import {Component} from 'react';
import {Image} from 'semantic-ui-react';
import CustomCarousel from '../custom/customCarousel/CustomCarousel.component';
interface IProps {
	blessingMedia: BlessingMediaDTO;
	isMobile?: boolean;
	itemsToShow: number;
	onImageClick: any;
	breakPoints?: Array<{width: number; itemsToShow: number; itemsToScroll?: number}>;
	fromWhere: string; // this is for the unique name of the carousel
}

interface IState {}

export default class MediaCarouselComponent extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<CustomCarousel
				carouselId={`${this.props.fromWhere}_media_modal`}
				isAutoPlay={false}
				enableMouseSwipe={false}
				isPagination={!this.props.isMobile}
				itemsToShow={this.props.itemsToShow}
				showArrows={!this.props.isMobile}
				breakPoints={this.props.breakPoints}
				itemPadding={[0, 7]}>
				{this.props.blessingMedia.media.map((mediaObject) => {
					return (
						<Image
							key={mediaObject.mediaUrl} // change this?
							src={mediaObject!.mediaUrl}
							borderradius20='1'
							cursorpointer='1'
							mediacarouselwidth='1'
							onClick={() => {
								this.props.onImageClick(mediaObject!.mediaUrl);
							}}
						/>
					);
				})}
			</CustomCarousel>
		);
	}
}
