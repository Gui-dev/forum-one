import { Entity } from '@/core/entities/entity'

import { UniqueEntityID } from './value-objects/unique-entity-id'

interface IQuestionAttachmentProps {
  question_id: UniqueEntityID
  attachment_id: UniqueEntityID
}

export class QuestionAttachment extends Entity<IQuestionAttachmentProps> {
  public static create(props: IQuestionAttachmentProps, id?: UniqueEntityID) {
    const questionAttachment = new QuestionAttachment(props, id)

    return questionAttachment
  }

  get question_id() {
    return this.props.question_id
  }

  get attachment_id() {
    return this.props.attachment_id
  }
}
