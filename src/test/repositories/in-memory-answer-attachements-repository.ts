/* eslint-disable prettier/prettier */
import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements IAnswerAttachmentsRepository {
  public items: AnswerAttachment[] = []

  public async findManyByAnswerId(
    answer_id: string,
  ): Promise<AnswerAttachment[]> {
    const answerAttachments = this.items.filter(
      (item) => item.answer_id.toString() === answer_id,
    )

    return answerAttachments
  }

  public async deleteManyByAnswerId(answer_id: string): Promise<void> {
    const answerAttachments = this.items.filter(
      (item) => item.answer_id.toString() !== answer_id,
    )
    this.items = answerAttachments
  }
}
