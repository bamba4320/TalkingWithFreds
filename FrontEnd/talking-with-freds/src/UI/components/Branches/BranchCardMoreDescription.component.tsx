import BenefitPageModel from 'common/models/BenefitPage.model';
import BranchModel from 'common/models/Branch.model';
import CategoryDTO from 'common/models/DTOs/Category.dto';
import * as React from 'react';
import {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Button, Divider, Header} from 'semantic-ui-react';
import HtmlMessageComponent from '../custom/customHtmlMessage/customHtmlMessage.component';

export interface IProps {
	branchModel: BranchModel;
	category: CategoryDTO | BenefitPageModel;
	des: string;
	index: number;
}

export interface IState {
	showMoreDescription: boolean;
}

class BranchCardMoreDetails extends Component<IProps, IState> {
	private branchModel: BranchModel;
	constructor(props: IProps) {
		super(props);
		this.branchModel = this.props.branchModel as BranchModel;
		this.state = {
			showMoreDescription: false,
		};
	}

	public render() {
		return (
			<div
				className={
					this.branchModel.moreDetials && this.branchModel.moreDetials.description.length > 1 ? 'more-details-card' : ''
				}>
				<Header className='flex-header' zeromargintop='1' key={`des${this.props.index}${this.props.des}`}>
					<Header.Subheader primaryheader='1'>
						<HtmlMessageComponent htmlMessage={this.props.des} />
					</Header.Subheader>
					{this.branchModel.moreDetials && this.branchModel.moreDetials.description.length > 1 && (
						<Button
							className='link-button more-des'
							size='large'
							linkbutton='1'
							whitebackground='1'
							onClick={() => {
								this.setState({showMoreDescription: !this.state.showMoreDescription});
							}}>
							<FormattedMessage id='branches.ImportantToKnow' />
						</Button>
					)}
				</Header>
				{/* show the details if there is only one variant or if there are more, then according to the state */}
				{((this.branchModel.moreDetials && this.branchModel.moreDetials.description.length === 1) ||
					this.state.showMoreDescription) && (
					<>
						<Divider />
						<Header size='large'>
							<FormattedMessage id='branches.ImportantToKnow' />
						</Header>
						<Header nomargin='1'>
							<Header.Subheader primaryheader='1' boldheader='1'>
								<FormattedMessage id='branches.HowToImplement' />
							</Header.Subheader>
						</Header>
						{this.props.category.variants && this.props.category.variants[0] && (
							<HtmlMessageComponent
								extraClassname='header-margin-bottom'
								htmlMessage={this.props.category.variants[0].redimTypeName}
							/>
						)}
						<Header nomargin='1'>
							<Header.Subheader primaryheader='1' boldheader='1'>
								<FormattedMessage id='MustToKnow.ExtraInfo' />
							</Header.Subheader>
						</Header>
						{this.branchModel.moreDetials && this.branchModel.moreDetials.businessGeneralInformationHTML && (
							<HtmlMessageComponent
								extraClassname='header-margin-bottom'
								htmlMessage={
									this.branchModel.moreDetials.businessGeneralInformationHTML.length > this.props.index
										? this.branchModel.moreDetials.businessGeneralInformationHTML[this.props.index]
										: ''
								}
							/>
						)}
					</>
				)}
			</div>
		);
	}
}
export default BranchCardMoreDetails;
