import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, IAnswerProps } from '@/domain/forum/enterprise/entities/answer'

export const makeAnswer = (
  override: Partial<IAnswerProps> = {},
  id?: UniqueEntityID,
) => {
  const question = Answer.create(
    {
      author_id: new UniqueEntityID(),
      question_id: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
