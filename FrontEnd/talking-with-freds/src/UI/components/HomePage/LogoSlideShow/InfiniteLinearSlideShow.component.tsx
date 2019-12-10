import {CONFIGURATION_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import BrowserUtils from 'common/utils/browser/BrowserUtils';
import {inject} from 'mobx-react';
import React from 'react';
import {Image} from 'semantic-ui-react';

interface IInfiniteLinearSlideShowComponentProps {
	src: string;
	alt: string;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	isMobile?: boolean;
}
interface IInfiniteLinearSlideShowComponentState {
	endPoint: string;
	startPoint: string;
	leftPosition: string;
	wrapperIEClassName: boolean;
}

@inject(CONFIGURATION_STORE)
export default class InfiniteLinearSlideShowComponent extends React.Component<
	IInfiniteLinearSlideShowComponentProps,
	IInfiniteLinearSlideShowComponentState
> {
	private wrapper: HTMLElement | null;
	private imageWidth: number;
	private imageHeight: number;
	private screenWidth: number;
	private configurationStore: ConfigurationStore;
	constructor(props: IInfiniteLinearSlideShowComponentProps) {
		super(props);
		this.wrapper = null;
		this.imageWidth = 0;
		this.imageHeight = 0;
		this.screenWidth = 0;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.state = {
			endPoint: '',
			leftPosition: '',
			startPoint: '',
			wrapperIEClassName: false,
		};
	}

	public componentDidMount() {
		// we do this in setTimeout for changing the size of the screen to
		// mobile/desktop so it would wait the image will load and then
		// get the sizes
		setTimeout(() => {
			// get the image element and use it's size
			const img = document.getElementById('moving-logos-pic');
			this.wrapper = document.getElementById('static-wrapper');
			// set the display width to the parent component width, or screen width.
			this.screenWidth = this.wrapper ? (this.wrapper as HTMLDivElement).offsetWidth : screen.width;
			this.imageWidth = img ? (img as HTMLImageElement).naturalWidth : 0;
			this.imageHeight = img ? (img as HTMLImageElement).naturalHeight : 0;
			if (this.wrapper) {
				if (this.imageWidth > this.screenWidth) {
					// those settings are for images that are widther then the screen.
					this.setState({
						endPoint: `-${(this.imageWidth / this.screenWidth) * 100 - 95}%`,
						startPoint: '0',
						leftPosition: '0',
					});
				} else {
					// those settings are for images less widther then the screen
					const center: string = `${this.screenWidth / 2 - this.imageWidth / 2}px`;
					this.setState({endPoint: center, startPoint: center, leftPosition: center});
				}
			}
			// if IE
			if (BrowserUtils.detectBrowser(window.navigator.userAgent.toLowerCase()) === 5) {
				this.setState({wrapperIEClassName: true});
			}
		}, 800);
	}

	public render() {
		return (
			<div
				id='static-wrapper'
				className={this.state.wrapperIEClassName ? 'ie-wrapper' : 'wrapper'}
				style={{
					'--logo-slider-animation-time': `${this.calculateAnimationTime()}s`,
					'--logo-slider-image-left-position': this.state.leftPosition,
					'--logo-slider-image-start-animation-point': this.state.startPoint,
					'--logo-slider-image-end-animation-point': this.state.endPoint,
					'--logo-slider-image-width': `${this.imageWidth}px`,
					'--logo-slider-image-height': `${this.imageHeight}px`,
				}}>
				<div className='moving-logo-img-static-div'>
					<div className='moving-logo-img-moving-div'>
						<Image id='moving-logos-pic' className='moving-logo-img' src={this.props.src} alt={this.props.alt} />
					</div>
				</div>
			</div>
		);
	}

	private calculateAnimationTime(): number {
		/*
			animation time calculation:
			
			current speed: (image width * the end point for the animation) * 2 / 30
			wished speed: from configuration

			current speed / wished speed: multiply this by 30s and get the wished animation time. 		
		*/
		const speed: number = this.configurationStore.configuration.homepageCyclicImageSpeed;
		return (
			((this.imageWidth * (((this.imageWidth / this.screenWidth) * 100 - 95) / 100) * 2) /
				30 /
				(this.props.isMobile ? speed / 2 : speed)) *
			30
		);
	}
}
