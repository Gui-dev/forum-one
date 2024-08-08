import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { FetchRecentQuestionsUseCase } from '../fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ created_at: new Date(2024, 7, 10) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ created_at: new Date(2024, 7, 8) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ created_at: new Date(2024, 7, 13) }),
    )
    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ created_at: new Date(2024, 7, 13) }),
      expect.objectContaining({ created_at: new Date(2024, 7, 10) }),
      expect.objectContaining({ created_at: new Date(2024, 7, 8) }),
    ])
  })
})
