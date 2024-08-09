import { Optional } from '@/@types/optional'

import { Comment, ICommentProps } from './comment'
import { UniqueEntityID } from './value-objects/unique-entity-id'

export interface IQuestionCommentProps extends ICommentProps {
  question_id: UniqueEntityID
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
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

  get question_id() {
    return this.props.question_id
  }
}
