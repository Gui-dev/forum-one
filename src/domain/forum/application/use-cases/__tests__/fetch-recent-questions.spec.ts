import { expect } from 'vitest'

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
    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ created_at: new Date(2024, 7, 13) }),
      expect.objectContaining({ created_at: new Date(2024, 7, 10) }),
      expect.objectContaining({ created_at: new Date(2024, 7, 8) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
