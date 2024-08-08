import { Optional } from '@/@types/optional'
import { Entity } from '@/core/entities/entity'

import { UniqueEntityID } from './value-objects/unique-entity-id'

export interface IAnswerCommentProps {
  author_id: UniqueEntityID
  answer_id: UniqueEntityID
  content: string
  created_at: Date
  updated_at?: Date
}

export class AnswerComment extends Entity<IAnswerCommentProps> {
  public static create(
    props: Optional<IAnswerCommentProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return answerComment
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  get author_id() {
    return this.props.author_id
  }

  get answer_id() {
    return this.props.answer_id
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }
}
