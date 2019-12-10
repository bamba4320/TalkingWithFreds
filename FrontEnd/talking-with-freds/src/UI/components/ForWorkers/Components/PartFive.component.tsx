import {ForWorkersMessages} from 'common/generalconsts/messages.consts';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import {Container, Grid, GridColumn, Image} from 'semantic-ui-react';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import {checkUndefined, setImage} from './utility';

interface IPartFiveComponentProps {
	intl: InjectedIntl;
	messages: ForWorkersMessages;
	imagePlaceholder: string;
}
interface IPartFiveComponentState {}

class PartFiveComponent extends React.Component<IPartFiveComponentProps, IPartFiveComponentState> {
	constructor(props: IPartFiveComponentProps) {
		super(props);
	}

	public render() {
		return (
			<>
				<div className='hide-mobile'>
					<Container>
						<Grid columns={'2'} className='margin-top-bottom'>
							<GridColumn>
								<div className='center-vertical'>
									<div className='header-with-underline'>
										{this.props.intl.formatMessage({id: 'EmployeeGift.chooseHowToGive'})}
									</div>
									<div className='employee-gifts-how-to-give'>
										{/* <Container text textAlign='right'> */}
										{checkUndefined(this.props.messages.part4_internal2_text)}
										{/* </Container> */}
									</div>
								</div>
							</GridColumn>
							<GridColumn>
								<Image
									src={setImage(this.props.messages.part5_internal2_pic, this.props.imagePlaceholder)}
									centered
									alt={this.props.intl.formatMessage({id: 'EmployeeGift.part5.alt'})}
								/>
							</GridColumn>
						</Grid>
						<div className='employee-gifts-divider' />
					</Container>
				</div>
				<div className='hide-desktop margin-top-bottom-big'>
					<div className='title-container-override'>
						<CustomTitleComponent
							content={this.props.intl.formatMessage({id: 'EmployeeGift.chooseHowToGive'})}
							notMain
							margin='0 0 16rem 0'
							padding='32px 60px'
							fontszsubheader={'1.1rem'}
							fontszheader={'50px'}>
							{checkUndefined(this.props.messages.part4_internal2_text)}
						</CustomTitleComponent>
					</div>
					<div className='mobile-padding'>
						<Image
							src={setImage(this.props.messages.part5_m_internal2_pic, this.props.imagePlaceholder)}
							centered
							alt={this.props.intl.formatMessage({id: 'EmployeeGift.part5.alt'})}
						/>
					</div>
					<div className='space-40' />
					<div className='space-20' />
					<div className='employee-gifts-divider' />
				</div>
			</>
		);
	}
}

export default PartFiveComponent;
