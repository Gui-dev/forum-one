import { Optional } from '@/@types/optional'
import { Entity } from '@/core/entities/entity'

import { UniqueEntityID } from './value-objects/unique-entity-id'

export interface IQuestionCommentProps {
  author_id: UniqueEntityID
  question_id: UniqueEntityID
  content: string
  created_at: Date
  updated_at?: Date
}

export class QuestionComment extends Entity<IQuestionCommentProps> {
  public static create(
    props: Optional<IQuestionCommentProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return questionComment
  }

  private touch() {
    this.props.updated_at = new Date()
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

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }
}
