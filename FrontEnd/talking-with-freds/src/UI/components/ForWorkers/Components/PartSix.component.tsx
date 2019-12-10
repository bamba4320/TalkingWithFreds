import {ForWorkersMessages} from 'common/generalconsts/messages.consts';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import {Container, Grid, GridColumn, Image} from 'semantic-ui-react';
import {checkUndefined, setImage} from './utility';

interface IPartSixComponentProps {
	intl: InjectedIntl;
	messages: ForWorkersMessages;
	imagePlaceholder: string;
}
interface IPartSixComponentState {}

class PartSixComponent extends React.Component<IPartSixComponentProps, IPartSixComponentState> {
	constructor(props: IPartSixComponentProps) {
		super(props);
	}

	public render() {
		return (
			<>
				<div className='hide-mobile'>
					<Container>
						<Grid columns={'2'} className='margin-top-bottom'>
							<GridColumn width='4'>
								<div className='center-vertical'>
									<div className='header-with-underline'>
										{this.props.intl.formatMessage({id: 'EmployeeGift.giftsThatAreEasyToManage'})}
									</div>

									<div className='employee-gifts-how-to-give'>
										{/* <Container text textAlign='right'> */}
										{checkUndefined(this.props.messages.part4_internal3_text)}
										{/* </Container> */}
									</div>
								</div>
							</GridColumn>
							<GridColumn width='12'>
								<Image
									src={setImage(this.props.messages.part4_internal2_pic, this.props.imagePlaceholder)}
									centered
									alt={this.props.intl.formatMessage({id: 'EmployeeGift.part6.alt'})}
								/>
							</GridColumn>
						</Grid>
					</Container>
				</div>
				<div className='hide-desktop mobile-padding'>
					<div className='header-with-underline'>
						{this.props.intl.formatMessage({id: 'EmployeeGift.giftsThatAreEasyToManage'})}
					</div>
					<div className='employee-gifts-how-to-give'>{checkUndefined(this.props.messages.part4_internal3_text)}</div>
					<Image
						src={setImage(this.props.messages.part4_m_internal2_pic, this.props.imagePlaceholder)}
						centered
						alt={this.props.intl.formatMessage({id: 'EmployeeGift.part6.alt'})}
					/>
				</div>
			</>
		);
	}
}

export default PartSixComponent;
