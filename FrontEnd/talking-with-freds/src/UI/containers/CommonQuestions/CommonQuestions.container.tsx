import {CONTACT_STORE} from 'BL/stores';
import ContactUsStore from 'BL/stores/ContactUs.store';
import FaqDTO from 'common/models/DTOs/Faq.dto';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React, {createRef, RefObject} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {
	Accordion,
	Breadcrumb,
	Button,
	Divider,
	Grid,
	Header,
	Icon,
	Menu,
	Rail,
	Segment,
	Sticky,
} from 'semantic-ui-react';
import HtmlMessageComponent from 'UI/components/custom/customHtmlMessage/customHtmlMessage.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';

interface ICommonQuestionsContainerProps {
	[CONTACT_STORE]?: ContactUsStore;
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
}

interface ICommonQuestionsContainerState {
	activeIndex: number;
	pageYOffset: number;
	subjectsYoffset: Array<{y: number; height: number}>;
}
@inject(CONTACT_STORE)
@observer
class CommonQuestionsContainer extends React.Component<ICommonQuestionsContainerProps, ICommonQuestionsContainerState> {
	private contactStore: ContactUsStore;
	private contextRef = createRef();
	constructor(props: Readonly<ICommonQuestionsContainerProps>) {
		super(props);
		this.state = {
			activeIndex: -1,
			pageYOffset: 0,
			subjectsYoffset: [],
		};
		this.contactStore = this.props[CONTACT_STORE] as ContactUsStore;
	}

	public async componentDidMount() {
		const tempSubjectsYoffset: Array<{y: number; height: number}> = [];
		if (
			this.contactStore.FaqArray.length > 0 &&
			document.getElementById('title-row') &&
			document.getElementsByClassName('main-desktop-navbar-container').length > 0
		) {
			const height =
				document.getElementById('title-row')!.getBoundingClientRect().height +
				(document.getElementsByClassName('main-desktop-navbar-container')[0] as HTMLElement).getBoundingClientRect()
					.height;
			this.contactStore.FaqArray.forEach((faq, index) => {
				const subj = document.getElementById(`${faq.questionsSubjectKey}`)!;
				tempSubjectsYoffset[index] = {
					y: subj.offsetTop + height,
					height: subj.parentElement!.getBoundingClientRect().height,
				};
			});
		}
		window.onscroll = () => {
			this.setState({pageYOffset: window.pageYOffset});
		};
		setTimeout(() => {
			this.setState({
				subjectsYoffset: tempSubjectsYoffset,
			});
		}, 200);
	}

	public handleClick = (_e?: any, titleProps?: any) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};
	public renderSubject = (faqArray: FaqDTO[]) => {
		return faqArray.map(({subjectName, sort, questionsSubjectKey}, index) => {
			const active =
				this.state.subjectsYoffset.length > 0
					? this.state.pageYOffset >= this.state.subjectsYoffset[index].y - 35 &&
					  this.state.pageYOffset <=
							this.state.subjectsYoffset[index].y + this.state.subjectsYoffset[index].height - 35
					: false;
			return (
				<CustomResponsiveWrapper
					key={`${sort}_${index}`}
					mobileDetect={this.props.mobileDetect}
					desktopComponent={
						<a href={'#' + questionsSubjectKey}>
							<Menu.Item
								as={'div'}
								headerfont='1'
								className='subject-header'
								biggerfont='1'
								commonitem='1'
								name={subjectName}
								active={active}
							/>
						</a>
					}
					mobileComponent={
						<div className='btn-div'>
							<a href={'#' + questionsSubjectKey}>
								<Button normalfont='1' className='subjects-btn'>
									{subjectName}
								</Button>
							</a>
						</div>
					}
				/>
			);
		});
	};

	public render() {
		const faqArray = this.contactStore.FaqArray;
		let order: number = 0;
		return (
			<Grid className='common-div'>
				<Grid.Row only='computer' id='title-row'>
					<CustomTitleComponent content={Lang.format('footer.CommonQuestions')}>
						<Breadcrumb>
							<Link href='/'>
								<a>
									<Breadcrumb.Section whitesection='1'>
										<FormattedMessage id='general.nofshonit' />
									</Breadcrumb.Section>
								</a>
							</Link>
							<Breadcrumb.Divider whitedivider='1' icon='left angle' />
							<Breadcrumb.Section>{Lang.format('footer.CommonQuestions')}</Breadcrumb.Section>
						</Breadcrumb>
					</CustomTitleComponent>
				</Grid.Row>
				<Grid.Row style={{paddingTop: '2rem', paddingBottom: '0'}} only='mobile tablet'>
					<Header as='h4' textfontheader='1' className='mobile-header'>
						{Lang.format('navbar.Help')}
					</Header>
				</Grid.Row>
				<Grid.Row>
					<CustomResponsiveWrapper
						mobileDetect={this.props.mobileDetect}
						desktopComponent={<></>}
						mobileComponent={
							<Grid.Column width={16} className='subjects-grid'>
								<Menu pointing secondary vertical commonmenu='1' className='subjects-div'>
									<div className='headers-div'>
										<Header as='h2'>
											{Lang.format('footer.CommonQuestions')}
											<Header.Subheader>{Lang.format('commonQuestion.Subjects')}</Header.Subheader>
										</Header>
									</div>

									{this.renderSubject(faqArray)}
								</Menu>
							</Grid.Column>
						}
					/>
					<Grid.Column width={16}>
						<Grid centered columns={3} className='subjects-grid'>
							<Grid.Column>
								<div ref={this.contextRef as RefObject<HTMLDivElement>} className='questions-div'>
									{faqArray.map(({subjectName, questions, questionsSubjectKey}) => (
										<div key={subjectName}>
											<Header as='h2' className='question-header' id={questionsSubjectKey}>
												{subjectName}
											</Header>
											{questions.map(({question, answer}) => (
												<Accordion className='accordion' key={question}>
													<Accordion.Title
														textfont='1'
														className='accordion-title'
														active={this.state.activeIndex === order}
														index={order}
														onClick={this.handleClick}>
														<div className='accordion-text'>{question}</div>
														<Icon className='accordion-icon' name='chevron down' />
													</Accordion.Title>
													<Accordion.Content className='accordion-content' active={this.state.activeIndex === order++}>
														<HtmlMessageComponent htmlMessage={answer} />
													</Accordion.Content>
													<Divider className='accordion-divider' />
												</Accordion>
											))}
										</div>
									))}
									<CustomResponsiveWrapper
										mobileDetect={this.props.mobileDetect}
										desktopComponent={
											<Rail position='right'>
												<Menu pointing secondary vertical commonmenu='1' className='subjects-div'>
													<div className='headers-div'>
														<Header as='h2'>
															{Lang.format('footer.CommonQuestions')}
															<Header.Subheader>{Lang.format('commonQuestion.Subjects')}</Header.Subheader>
														</Header>
													</div>

													<Sticky context={this.contextRef}>{this.renderSubject(faqArray)}</Sticky>
												</Menu>
											</Rail>
										}
										mobileComponent={<></>}
									/>
								</div>
							</Grid.Column>
						</Grid>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className='contact-div'>
					<Divider className='contact-divider' fullwidthdivider='1' />
					<Segment placeholder className='contact-segment'>
						<Header textAlign='center' primaryheader='1'>
							{Lang.format('commonQuestion.HaveQuestions')}
						</Header>
						<Link href={routesPaths.contactUs.root}>
							<a>
								<Button opositebutton='1' circular className='contact-btn'>
									{Lang.format('commonQuestion.MakeContact')}
								</Button>
							</a>
						</Link>
					</Segment>
				</Grid.Row>
			</Grid>
		);
	}
}
export default withIntl(CommonQuestionsContainer);
