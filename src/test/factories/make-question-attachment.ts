import {
  IQuestionAttachmentProps,
  QuestionAttachment,
} from '@/domain/forum/enterprise/entities/question-attachment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

export const makeQuestionAttachment = (
  override: Partial<IQuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) => {
  const questionAttachment = QuestionAttachment.create(
    {
      question_id: new UniqueEntityID(),
      attachment_id: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionAttachment
}
