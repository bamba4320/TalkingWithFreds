import {ForWorkersMessages} from 'common/generalconsts/messages.consts';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import {Button, Container, Grid, Header, Image} from 'semantic-ui-react';
import EditorMessageComponent from 'UI/components/custom/customEditorMessage/customEditorMessage.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import {checkUndefined, setImage} from './utility';

interface ITopPartComponentProps {
	intl: InjectedIntl;
	messages: ForWorkersMessages;
	imagePlaceholder: string;
	isLoggedIn: boolean;
}
interface ITopPartComponentState {}

class TopPartComponent extends React.Component<ITopPartComponentProps, ITopPartComponentState> {
	constructor(props: ITopPartComponentProps) {
		super(props);
	}

	scrollToContactForm = (device: string) => {
		device === 'mobile'
			? scrollTo(0, (window as any).contactFormOffsetTop.current.offsetTop + 200)
			: scrollTo(0, (window as any).contactFormOffsetTop.current.offsetTop - 130);
	};

	public render() {
		const messages = this.props.messages;
		const imagePlaceholder = this.props.imagePlaceholder;

		return (
			<>
				<div className='hide-mobile'>
					<CustomTitleComponent
						subheadermt={
							this.props.intl.formatMessage({id: 'EmployeeGift.employeeGiftsWithQuietMind'}) === '' ? '12rem' : ''
						}
						fontszsubheader='1.95rem'
						content={this.props.intl.formatMessage({id: 'EmployeeGift.employeeGiftsWithQuietMind'})}
						fixedheight
						margin='0 0 16rem 0'>
						{checkUndefined(messages.part1_title)}
					</CustomTitleComponent>
					<Grid columns={2} className='grid__centered'>
						<Grid.Column>
							<Grid.Row>
								{
									<Image
										src={setImage(messages.part1_internal1_pic, imagePlaceholder)}
										size='medium'
										centered
										roundimage='1'
										className='subhead__title__img'
										alt={this.props.intl.formatMessage({id: 'EmployeeGift.part6.alt'})}
									/>
								}
								<Container textAlign='center' className='top-text-container'>
									<div className='space-20' />
									<EditorMessageComponent message={messages.part1_internal1_text} />
								</Container>
							</Grid.Row>
							<Grid.Row>
								<div className='space-20' />
								<Container textAlign='center' className='btn-container'>
									<Button
										primary
										circular
										onClick={() => this.scrollToContactForm('desktop')}
										className={'color-white center-button'}>
										{this.props.intl.formatMessage({id: 'EmployeeGift.getPriceProposal'})}
									</Button>
								</Container>
							</Grid.Row>
						</Grid.Column>
						{/* Second Column */}
						<Grid.Column>
							{
								<Image
									src={setImage(messages.part1_internal2_pic, imagePlaceholder)}
									size='medium'
									centered
									roundimage='1'
									className='subhead__title__img'
									alt={this.props.intl.formatMessage({id: 'EmployeeGift.top.alt1'})}
								/>
							}
							<Container textAlign='center' className='top-text-container'>
								<div className='space-20' />
								<EditorMessageComponent message={messages.part1_internal2_text} />
								<div className='space-20' />
							</Container>
							<div className='space-15' />
							<Container textAlign='center' className='btn-container'>
								<Header as='h2' primaryheader='1'>
									{this.props.intl.formatMessage({id: 'EmployeeGift.will'})}
								</Header>
							</Container>
						</Grid.Column>
					</Grid>
				</div>
				<div className='hide-desktop'>
					<div className='top-image-mobile'>
						<Image
							src={setImage(messages.upper_part_m_pic_title, imagePlaceholder)}
							alt={this.props.intl.formatMessage({id: 'EmployeeGift.top.alt2'})}
						/>
					</div>
					<div className='pull-top'>
						<div className='top-gifts-container-rounded-top'>
							<div className='header-with-underline'>
								{this.props.intl.formatMessage({id: 'EmployeeGift.employeeGiftsWithQuietMind'})}
							</div>
							<div className='space-10' />
							<span className='employee-gifts-text-size'>
								{<EditorMessageComponent message={messages.part1_title} />}
							</span>
						</div>
						<div className='employee-gifts-divider' />
						<div className='top-gifts-container'>
							<EditorMessageComponent message={messages.part1_internal1_text} />
							<div className='space-20' />
							<Container textAlign='center' className='btn-container'>
								<Button
									primary
									circular
									onClick={() => this.scrollToContactForm('mobile')}
									className={'color-white center-button'}>
									{this.props.intl.formatMessage({id: 'EmployeeGift.getPriceProposal'})}
								</Button>
							</Container>
						</div>
						<div className='employee-gifts-divider' />
						<div className='top-gifts-container'>
							<div className='space-10' />
							<EditorMessageComponent message={messages.part1_internal2_text} />
							<Header as='h2'>
								<Header.Subheader primaryheader='1' boldheader='1'>
									{this.props.intl.formatMessage({id: 'EmployeeGift.will'})}
								</Header.Subheader>
							</Header>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default TopPartComponent;
