import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { GetQuestionBySlugUseCase } from '../get-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to find a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('fake-title'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({
      slug: 'fake-title',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
