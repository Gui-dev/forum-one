import { Optional } from '@/@types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AnswerAttachmentList } from './answer-attachment-list'

export interface IAnswerProps {
  author_id: UniqueEntityID
  question_id: UniqueEntityID
  content: string
  attachments: AnswerAttachmentList
  created_at: Date
  updated_at?: Date
}

export class Answer extends Entity<IAnswerProps> {
  public static create(
    props: Optional<IAnswerProps, 'attachments' | 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return answer
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get author_id() {
    return this.props.author_id
  }

  get question_id() {
    return this.props.question_id
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }
}
