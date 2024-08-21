import { Optional } from '@/@types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Comment, ICommentProps } from './comment'

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
