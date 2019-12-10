import {MustToKnowDTO} from 'common/models/DTOs/MustToKnow.dto';
import Lang from 'Infrastructure/Language/Language';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Container, Grid, Header, Icon, Image} from 'semantic-ui-react';
import CustomTitleComponent from '../../custom/customTitle/CustomTitle.component';
import CustomResponsiveWrapper from '../../CustomResponsiveWrapper';
import MustToKnowDetail from './MustToKnowDetail.component';
export interface IMustToKnowProps {
	mobileDetect: MobileDetect;
	MustToKnow: MustToKnowDTO[];
	additionalInfo: string;
	redimType: string;
	expireDate: string;
	openModal?: any;
	closeModal?: any;
	categoryName?: string;
	intl: InjectedIntl;
	isHidden: boolean;
}

export interface IMustToKnowState {}

class MustToKnowComponent extends React.Component<IMustToKnowProps, IMustToKnowState> {
	constructor(props: IMustToKnowProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				mobileComponent={this.renderMobile()}
				desktopComponent={this.renderDesktop()}
			/>
		);
	}

	public renderDesktop() {
		return (
			<Grid padded className='must-to-know'>
				<Grid.Row>
					<Container fluid paddingtop40='1' paddingbottom20='1'>
						<Header as='h2' primaryheader='1' h1font='1'>
							{Lang.format('mustToKnow.title')}
						</Header>
					</Container>
				</Grid.Row>
				{this.renderMustToKnowDetail()}
			</Grid>
		);
	}

	public renderMobile() {
		return (
			<div className='must-to-know-mobile'>
				<CustomTitleComponent
					toptag
					notMain
					padding='50px 10px 0 0'
					fontszheader='3.5rem'
					width='75%'
					custombg='#FEB4C9'
					content={Lang.format('mustToKnow.title')}>
					{this.props.categoryName}
				</CustomTitleComponent>
				<Icon
					className='back-btn'
					name='angle right'
					size='big'
					onClick={() => {
						this.props.closeModal(false);
					}}
				/>
				<Image src='/static/images/must-to-know.png' className='z-img' />
				<div className='mustknowdeatial'>{this.renderMustToKnowDetail()}</div>
			</div>
		);
	}

	private renderMustToKnowDetail() {
		return (
			<>
				{this.props.expireDate && !this.props.isHidden && (
					<MustToKnowDetail
						mustToKnowName={this.props.intl.formatMessage({id: 'payment.validity'})}
						mustToKnowDescription={this.props.expireDate}
						mustToKnowIsCollapse={false}
					/>
				)}
				{this.props.MustToKnow &&
					this.props.MustToKnow.sort((mustToKnow) => mustToKnow.sort).map((mustToKnow, index) => {
						return (
							<MustToKnowDetail
								key={`MustToKnowDetail${mustToKnow.sort}${index}`}
								mustToKnowName={mustToKnow.adminDescription}
								mustToKnowDescription={mustToKnow.messageText}
								mustToKnowIsCollapse={mustToKnow.messageText ? mustToKnow.messageText.length > 15 : false}
							/>
						);
					})}
				{this.props.additionalInfo && (
					<MustToKnowDetail
						mustToKnowName={this.props.intl.formatMessage({id: 'MustToKnow.ExtraInfo'})}
						mustToKnowDescription={this.props.additionalInfo}
						mustToKnowIsCollapse={false}
						isHeaderAndSub
					/>
				)}
				<MustToKnowDetail
					mustToKnowName={this.props.intl.formatMessage({id: 'MustToKnow.RedimType'})}
					mustToKnowDescription={this.props.redimType ? this.props.redimType : ''}
					mustToKnowIsCollapse={false}
					isHeaderAndSub
				/>
			</>
		);
	}
}
export default withIntl(MustToKnowComponent);
