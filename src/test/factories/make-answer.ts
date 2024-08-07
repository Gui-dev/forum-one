import { faker } from '@faker-js/faker'

import { Answer, IAnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

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
