import {
  IQuestionProps,
  Question,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

export const makeQuestion = (override: Partial<IQuestionProps> = {}) => {
  const question = Question.create({
    author_id: new UniqueEntityID(),
    title: 'Fake title',
    content: 'Fake content',
    slug: Slug.create('fake-title'),
    ...override,
  })

  return question
}
