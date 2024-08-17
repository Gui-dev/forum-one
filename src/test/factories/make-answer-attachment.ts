import {
  AnswerAttachment,
  IAnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

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
