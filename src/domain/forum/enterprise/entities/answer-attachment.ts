import { Entity } from '@/core/entities/entity'

import { UniqueEntityID } from './value-objects/unique-entity-id'

export interface IAnswerAttachmentProps {
  answer_id: UniqueEntityID
  attachment_id: UniqueEntityID
}

export class AnswerAttachment extends Entity<IAnswerAttachmentProps> {
  public static create(props: IAnswerAttachmentProps, id?: UniqueEntityID) {
    const answerAttachment = new AnswerAttachment(props, id)

    return answerAttachment
  }

  get answer_id() {
    return this.props.answer_id
  }

  get attachment_id() {
    return this.props.attachment_id
  }
}
