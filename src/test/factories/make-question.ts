import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IQuestionProps,
  Question,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export const makeQuestion = (
  override: Partial<IQuestionProps> = {},
  id?: UniqueEntityID,
) => {
  const question = Question.create(
    {
      author_id: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: Slug.create('fake-title'),
      ...override,
    },
    id,
  )

  return question
}
