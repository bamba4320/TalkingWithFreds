import {CONTACT_STORE} from 'BL/stores';
import ContactUsStore from 'BL/stores/ContactUs.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Accordion, Button, Divider, Header, Icon, Segment} from 'semantic-ui-react';
import HtmlMessageComponent from '../customHtmlMessage/customHtmlMessage.component';

interface IProps {
	questionsSubjectKey: number;
	[CONTACT_STORE]?: ContactUsStore;
	intl: InjectedIntl;
}

interface IState {
	activeIndex: number;
}
@inject(CONTACT_STORE)
@observer
class CustomCommonQuestions extends React.Component<IProps, IState> {
	private contactStore: ContactUsStore;
	constructor(props: any) {
		super(props);
		this.state = {
			activeIndex: -1,
		};
		this.contactStore = this.props[CONTACT_STORE] as ContactUsStore;
	}

	public async componentDidMount() {
		if (!this.contactStore.FaqArray[0]) {
			await this.contactStore.getFAQ();
		}
	}

	public handleClick = (_e?: any, titleProps?: any) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};

	public render() {
		const intl = this.props.intl as InjectedIntl;
		const faqArray = this.contactStore.FaqArray;
		let order: number = 0;
		return (
			<div className='custom-common-questions'>
				{faqArray.map(
					({subjectName, questions, questionsSubjectKey}, index) =>
						this.props.questionsSubjectKey === questionsSubjectKey && (
							<div key={questionsSubjectKey}>
								<Header as='h2' className='question-header' id={subjectName}>
									{intl.formatMessage({id: 'commonQuestion.title'})}
								</Header>
								{questions.map(({question, answer, sort}, index2) => (
									<Accordion className='accordion' key={`${sort}_${index}_${index2}`}>
										<Accordion.Title
											textfont='1'
											className='accordion-title'
											active={this.state.activeIndex === order}
											index={order}
											onClick={this.handleClick}>
											<div>{question}</div>
											<Icon className='accordion-icon' name='chevron down' />
										</Accordion.Title>
										<Accordion.Content active={this.state.activeIndex === order++}>
											<HtmlMessageComponent htmlMessage={answer} extraClassname='common-question-answer' />
										</Accordion.Content>
										<Divider className='accordion-divider' />
									</Accordion>
								))}
							</div>
						)
				)}
				<Segment placeholder noborder='1' className='contact-segment' maxwidth100percent='1'>
					<Header as='h3' textAlign='center' primaryheader='1'>
						{intl.formatMessage({id: 'commonQuestion.HaveQuestions'})}
					</Header>
					<Link href={routesPaths.contactUs.root}>
						<a>
							<Button opositebutton='1' circular className='contact-btn'>
								{intl.formatMessage({id: 'commonQuestion.MakeContact'})}
							</Button>
						</a>
					</Link>
				</Segment>
			</div>
		);
	}
}
export default withIntl(CustomCommonQuestions);
