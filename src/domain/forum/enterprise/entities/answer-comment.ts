import { Optional } from '@/@types/optional'

import { Comment, ICommentProps } from './comment'
import { UniqueEntityID } from './value-objects/unique-entity-id'

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
