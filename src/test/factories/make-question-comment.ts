import { faker } from '@faker-js/faker'

import {
  IQuestionCommentProps,
  QuestionComment,
} from '@/domain/forum/enterprise/entities/question-comment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

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
