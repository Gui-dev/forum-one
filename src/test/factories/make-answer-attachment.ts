import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  IAnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export const makeAnswerAttachment = (
  override: Partial<IAnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) => {
  const answerAttachment = AnswerAttachment.create(
    {
      answer_id: new UniqueEntityID(),
      attachment_id: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
