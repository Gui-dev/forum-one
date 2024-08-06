import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from '../create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a new question', async () => {
    const { question } = await sut.execute({
      author_id: 'fake_author_id',
      title: 'Fake title',
      content: 'Fake content',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('Fake content')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
