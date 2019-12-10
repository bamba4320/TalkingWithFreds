import {ForWorkersMessages} from 'common/generalconsts/messages.consts';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import {Button, Container, Image} from 'semantic-ui-react';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import {checkUndefined, setImage} from './utility';

interface IPartSevenComponentProps {
	intl: InjectedIntl;
	messages: ForWorkersMessages;
	imagePlaceholder: string;
}
interface IPartSevenComponentState {}

class PartSevenComponent extends React.Component<IPartSevenComponentProps, IPartSevenComponentState> {
	constructor(props: IPartSevenComponentProps) {
		super(props);
	}

	public render() {
		return (
			<>
				<div className='hide-mobile'>
					<div className='custom-title-component-override'>
						<CustomTitleComponent
							content={this.props.intl.formatMessage({id: 'EmployeeGift.30YearsOfExperinceHundredesOfCustomers'})}
							notMain
							fontszsubheader='1.95rem'
							margin='0 0 16rem 0'>
							{checkUndefined(this.props.messages.part5_text)}
						</CustomTitleComponent>
					</div>
					<Image
						className='logos-image'
						src={setImage(this.props.messages.part5_pic, this.props.imagePlaceholder)}
						centered
						alt={this.props.intl.formatMessage({id: 'EmployeeGift.part7.alt'})}
					/>
					<div className='space-40' />
					<Container textAlign='center' className='btn-container'>
						<Link href={routesPaths.about}>
							<a>
								<Button primary circular className='all-btn'>
									{this.props.intl.formatMessage({id: 'EmployeeGift.moreAboutNofshonit'})}
								</Button>
							</a>
						</Link>
					</Container>
					<div className='space-40' />
				</div>
				<div className='hide-desktop mobile-padding margin-top-bottom-big'>
					<div className='header-with-underline'>
						{this.props.intl.formatMessage({id: 'EmployeeGift.30YearsOfExperinceHundredesOfCustomers'})}
					</div>
					<div className='employee-gifts-text-size'>{checkUndefined(this.props.messages.part5_text)}</div>
					<div className='space-10' />
					<Image
						src={setImage(this.props.messages.part5_m_pic, this.props.imagePlaceholder)}
						centered
						alt={this.props.intl.formatMessage({id: 'EmployeeGift.part7.alt'})}
					/>
					<div className='space-40' />
					<Container textAlign='center' className='btn-container'>
						<Link href={routesPaths.about}>
							<a>
								<Button primary circular className='all-btn'>
									{this.props.intl.formatMessage({id: 'EmployeeGift.moreAboutNofshonit'})}
								</Button>
							</a>
						</Link>
					</Container>
				</div>
			</>
		);
	}
}

export default PartSevenComponent;
