/* eslint-disable prettier/prettier */
import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements IQuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []

  public async findManyByQuestionId(
    question_id: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(
      (item) => item.question_id.toString() === question_id,
    )

    return questionAttachments
  }
}
