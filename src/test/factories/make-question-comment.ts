import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IQuestionCommentProps,
  QuestionComment,
} from '@/domain/forum/enterprise/entities/question-comment'

export const makeQuestionComment = (
  override: Partial<IQuestionCommentProps> = {},
  id?: UniqueEntityID,
) => {
  const questionComment = QuestionComment.create(
    {
      author_id: new UniqueEntityID(),
      question_id: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
