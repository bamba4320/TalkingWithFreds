import * as React from 'react';
import {Icon, Label, Popup} from 'semantic-ui-react';
import CustomResponsiveWrapper from '../CustomResponsiveWrapper';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
export interface IShareFlagProps {
	mobileDetect: MobileDetect;
	orderGuidePath?: string;
	intl: InjectedIntl;
}

export interface IShareFlagState {
	isOpen: boolean;
	domain: string;
}

class ShareFlag extends React.Component<IShareFlagProps, IShareFlagState> {
	constructor(props: IShareFlagProps) {
		super(props);

		this.state = {isOpen: false, domain: ''};
	}

	public componentDidMount() {
		this.setState({domain: window.location.origin});
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={
					<>
						<Popup
							share='1'
							trigger={
								<Label circular className='share-indication-label'>
									<Icon className='share-icon' name='share alternate' onClick={this.onDesktopClick} size='large' />
								</Label>
							}
							content={this.props.intl.formatMessage({id: 'ShareFlag.LinkCopied'})}
							on='click'
							open={this.state.isOpen}
							onOpen={this.handleOpen}
						/>
					</>
				}
				mobileComponent={
					<Label circular className='share-indication-label'>
						<Icon className='share-icon' name='share alternate' onClick={this.onMobileClick} size='large' />
					</Label>
				}
			/>
		);
	}

	private onDesktopClick = () => {
		const text: string = this.props.orderGuidePath
			? this.state.domain + this.props.orderGuidePath
			: window.location.href;
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text);
		} else {
			const y: number = document.documentElement.scrollTop;
			const textArea = document.createElement('textarea');
			textArea.value = text;
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
			} catch (err) {}

			document.body.removeChild(textArea);
			window.scrollTo(0, y);
		}
		setTimeout(this.handleClose, 1500);
	};

	private onMobileClick = () => {
		const newNavigator: any = navigator;
		if (newNavigator && newNavigator.share) {
			newNavigator.share({
				title: document.title,
				text: '',
				url: this.props.orderGuidePath ? this.state.domain + this.props.orderGuidePath : window.location.href,
			});
		} else {
			// TODO: itay - add alert
		}
	};

	private handleOpen = () => {
		this.setState({isOpen: true});
	};

	private handleClose = () => {
		this.setState({isOpen: false});
	};
}
export default withIntl(ShareFlag);
