import QuestionsDTO from './question.dto';

export default class FaqDTO {
	public questionsSubjectKey!: number;

	public subjectName!: string;

	public sort!: number;

	public questions!: QuestionsDTO[];
}
