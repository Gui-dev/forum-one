import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  IAnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'

export const makeAnswerComment = (
  override: Partial<IAnswerCommentProps> = {},
  id?: UniqueEntityID,
) => {
  const answerComment = AnswerComment.create(
    {
      author_id: new UniqueEntityID(),
      answer_id: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}
