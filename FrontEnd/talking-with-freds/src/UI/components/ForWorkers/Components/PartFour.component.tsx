import {ForWorkersMessages} from 'common/generalconsts/messages.consts';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import {Container, Image} from 'semantic-ui-react';
import {checkUndefined, setImage} from './utility';

interface IPartFourComponentProps {
	intl: InjectedIntl;
	messages: ForWorkersMessages;
	imagePlaceholder: string;
}
interface IPartFourComponentState {}

class PartFourComponent extends React.Component<IPartFourComponentProps, IPartFourComponentState> {
	constructor(props: IPartFourComponentProps) {
		super(props);
	}

	public render() {
		return (
			<>
				<div className='hide-mobile'>
					<Container>
						<div className='header-with-underline'>
							{this.props.intl.formatMessage({id: 'EmployeeGift.giftsForEveryOccasion'})}
						</div>
						<div className='employee-gifts-every-occasion-text'>
							{/* <Container text textAlign='right'> */}
							{checkUndefined(this.props.messages.part4_internal1_text)}
							{/* </Container> */}
						</div>
						<Image
							part4img='1'
							src={setImage(this.props.messages.part4_internal1_pic, this.props.imagePlaceholder)}
							alt={this.props.intl.formatMessage({id: 'EmployeeGift.part4.alt'})}
							className='gifts-for-all-occasion-image'
						/>
						<div className='space-40' />
						<div className='employee-gifts-divider' />
					</Container>
				</div>
				<div className='hide-desktop mobile-padding'>
					<div className='header-with-underline'>
						{this.props.intl.formatMessage({id: 'EmployeeGift.giftsForEveryOccasion'})}
						<div className='underline-135' />
					</div>
					<div className='employee-gifts-every-occasion-text'>
						{/* <Container text textAlign='right'> */}
						{checkUndefined(this.props.messages.part4_internal1_text)}
						{/* </Container> */}
					</div>
					<Image
						src={setImage(this.props.messages.m_internal1_pic, this.props.imagePlaceholder)}
						centered
						alt={this.props.intl.formatMessage({id: 'EmployeeGift.part4.alt'})}
					/>
				</div>
			</>
		);
	}
}

export default PartFourComponent;
