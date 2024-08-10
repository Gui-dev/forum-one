import { faker } from '@faker-js/faker'

import {
  AnswerComment,
  IAnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

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
