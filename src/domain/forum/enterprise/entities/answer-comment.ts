import { Optional } from '@/@types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Comment, ICommentProps } from './comment'

export interface IAnswerCommentProps extends ICommentProps {
  answer_id: UniqueEntityID
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
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

  get answer_id() {
    return this.props.answer_id
  }
}
