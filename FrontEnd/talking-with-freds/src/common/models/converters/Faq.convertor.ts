import {sortBy} from 'lodash';
import FaqDTO from '../DTOs/Faq.dto';
import QuestionsDTO from '../DTOs/question.dto';

export default class FaqConverter {
	public static question(questionsSubjectKey: number, question: string, answer: string, sort: number): QuestionsDTO {
		const converted: QuestionsDTO = new QuestionsDTO();
		converted.questionsSubjectKey = questionsSubjectKey;
		converted.question = question;
		converted.answer = answer;
		converted.sort = sort;
		return converted;
	}
	public static Faq(
		subject: string,
		questionsSubjectKey: number,
		sort: number,
		questions: Array<{questionsSubjectKey: number; question: string; answer: string; sort: number}>
	): FaqDTO {
		const converted: FaqDTO = new FaqDTO();
		converted.subjectName = subject;
		converted.questionsSubjectKey = questionsSubjectKey;
		converted.sort = sort;
		const questionsFaq = questions.map((question) => {
			return this.question(question.questionsSubjectKey, question.question, question.answer, question.sort);
		});
		converted.questions = sortBy(questionsFaq, (question) => {
			return question.sort;
		});
		return converted;
	}
	public static ArrayToFaq(
		array: Array<{
			questionsSubjectKey: number;
			subjectName: string;
			sort: number;
			questions: Array<{questionsSubjectKey: number; question: string; answer: string; sort: number}>;
		}>
	) {
		const faqArray = array.map(
			(value: {
				questionsSubjectKey: number;
				subjectName: string;
				sort: number;
				questions: Array<{questionsSubjectKey: number; question: string; answer: string; sort: number}>;
			}) => this.Faq(value.subjectName, value.questionsSubjectKey, value.sort, value.questions)
		);
		return sortBy(faqArray, (faqItem) => {
			return faqItem.sort;
		});
	}
}
