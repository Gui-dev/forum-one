import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface IAnswerAttachmentsRepository {
  findManyByAnswerId(answer_id: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answer_id: string): Promise<void>
}
