import BrowserUtils from 'common/utils/browser/BrowserUtils';
import React from 'react';
import {Container, Header} from 'semantic-ui-react';

interface IProps {
	content?: any;
	fixedheight?: boolean;
	margin?: string;
	custombg?: string;
	fontszheader?: string;
	fontszsubheader?: string;
	notMain?: boolean;
	subheadermt?: string;
	toptag?: boolean;
	padding?: string;
	width?: string;
	addDiv?: boolean;
}
interface IState {
	supportClipPath: boolean;
}

export default class CustomTitleComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {supportClipPath: true};
	}
	public componentDidMount() {
		const browser = BrowserUtils.detectBrowser(window.navigator.userAgent.toLowerCase());

		this.setState({
			supportClipPath: browser === 4 || browser === 6 || browser === 7,
		});
	}
	public render() {
		return (
			<div className='custom-title-div'>
				<div
					className='addition-div'
					style={{
						background: this.props.custombg ? this.props.custombg : '',
					}}
				/>
				<div
					className='addition-div'
					style={{
						display: this.props.addDiv ? '' : 'none',
						background: this.props.custombg ? this.props.custombg : '',
					}}
				/>
				<Container
					fluid
					className={this.state.supportClipPath ? 'title-container' : 'title-container not-support-clip-path'}
					fixedheight={this.props.fixedheight ? '1' : null}
					style={{
						margin: this.props.margin ? this.props.margin : null,
						background: this.props.custombg ? this.props.custombg : null,
					}}>
					<Header
						as={this.props.notMain ? 'h2' : 'h1'}
						whiteheader='1'
						customtitle={!this.props.notMain ? '1' : null}
						notmaincustomtitle={this.props.notMain ? '1' : null}
						toptagheader={this.props.toptag ? '1' : null}
						className='custom-title-header'
						style={{
							fontSize: this.props.fontszheader ? this.props.fontszheader : null,
							padding: this.props.padding ? this.props.padding : null,
							width: this.props.width ? this.props.width : null,
							marginTop: this.props.addDiv ? '-50px' : null,
						}}>
						{this.props.content}
						<Header.Subheader
							whitesubheader='1'
							style={{
								marginTop: this.props.subheadermt ? this.props.subheadermt : '',
								fontSize: this.props.fontszsubheader ? this.props.fontszsubheader : null,
							}}>
							{this.props.children}
						</Header.Subheader>
					</Header>
				</Container>
			</div>
		);
	}
}
