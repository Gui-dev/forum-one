import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface IQuestionAttachmentsRepository {
  findManyByQuestionId(question_id: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(question_id: string): Promise<void>
}
