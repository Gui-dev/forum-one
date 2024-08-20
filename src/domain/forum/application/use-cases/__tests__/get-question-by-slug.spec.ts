import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachements-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { GetQuestionBySlugUseCase } from '../get-question-by-slug'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to find a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('fake-title'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'fake-title',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
