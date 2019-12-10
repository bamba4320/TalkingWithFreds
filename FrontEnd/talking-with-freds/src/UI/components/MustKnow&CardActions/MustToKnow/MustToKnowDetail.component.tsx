import * as React from 'react';
import {Container, Divider, Grid, Header, Icon} from 'semantic-ui-react';

export interface IMustToKnowDetailProps {
	mustToKnowName: string;
	mustToKnowDescription: string;
	mustToKnowIsCollapse: boolean;
	isHeaderAndSub?: boolean;
}

export interface IMustToKnowDetailState {
	isCollapse: boolean;
}

export default class MustToKnowDetail extends React.Component<IMustToKnowDetailProps, IMustToKnowDetailState> {
	constructor(props: IMustToKnowDetailProps) {
		super(props);

		this.state = {
			isCollapse: true,
		};
	}

	public render() {
		return (
			<>
				<Grid
					style={{padding: '0'}}
					padded
					className={this.props.mustToKnowIsCollapse ? 'must-to-know-detail pointer' : 'must-to-know-detail'}>
					<Grid.Column style={{margin: 'auto', padding: '5px 0 0 0'}} computer={16} only='computer'>
						{this.renderDesktop()}
					</Grid.Column>
					<Grid.Column style={{paddingTop: 0, paddingBottom: 0}} tablet={16} mobile={16} only='mobile tablet'>
						{this.renderMobile()}
					</Grid.Column>
				</Grid>
			</>
		);
	}

	public renderDesktop() {
		if (this.props.isHeaderAndSub) {
			return (
				<>
					<Header
						as='h4'
						textfontheader='1'
						primaryheader='1'
						inlineheader='1'
						customtitlebold='1'
						letterspace1p3px='1'>
						{this.props.mustToKnowName}
					</Header>
					<div className='is-collapse' dangerouslySetInnerHTML={{__html: this.props.mustToKnowDescription}} />
					<Divider />
				</>
			);
		} else {
			return (
				<Container onClick={this.props.mustToKnowIsCollapse ? this.onClick : () => {}} fluid>
					<Header
						as='h4'
						textfontheader='1'
						primaryheader='1'
						inlineheader='1'
						customtitlebold='1'
						letterspace1p3px='1'>
						{this.props.mustToKnowName}
						{!this.props.mustToKnowIsCollapse && <span className='divider'>|</span>}
					</Header>
					{!this.props.mustToKnowIsCollapse && (
						<Header as='h4' textfontheader='1' primaryheader='1' inlineheader='1'>
							{this.props.mustToKnowDescription}
						</Header>
					)}
					<Icon
						className={this.props.mustToKnowIsCollapse ? 'angle-icon' : 'is-not-collapse'}
						name={this.state.isCollapse ? 'angle down' : 'angle up'}
						size='large'
					/>
					<div className={this.state.isCollapse ? 'is-not-collapse' : 'is-collapse'}>
						{this.props.mustToKnowDescription}
					</div>
					<Divider />
				</Container>
			);
		}
	}
	public renderMobile() {
		if (this.props.isHeaderAndSub) {
			return (
				<Container width100='1' margin0='1' textalignright='1' onClick={this.onClick}>
					<div className=''>
						<div className='accordion-text'>{this.props.mustToKnowName}</div>
					</div>
					<div className='is-collapse' dangerouslySetInnerHTML={{__html: this.props.mustToKnowDescription}} />
					<Divider />
				</Container>
			);
		} else {
			return (
				<Container width100='1' margin0='1' textalignright='1' onClick={this.onClick}>
					<div className='float-left'>
						<Icon
							className={'angle-icon-mobile'}
							name={this.state.isCollapse ? 'angle down' : 'angle up'}
							size='large'
						/>
					</div>
					<div className=''>
						<div className='accordion-text'>{this.props.mustToKnowName}</div>
					</div>
					<div className={this.state.isCollapse ? 'is-not-collapse' : 'is-collapse'}>
						{this.props.mustToKnowDescription}
					</div>
					<Divider />
				</Container>
			);
		}
	}

	private onClick = () => {
		this.setState({isCollapse: !this.state.isCollapse});
	};
}
