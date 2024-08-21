import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'

import { FetchAnswerCommentsUseCase } from '../fetch-answer-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answer_id: new UniqueEntityID('fake_answer_id'),
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answer_id: new UniqueEntityID('fake_answer_id'),
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answer_id: new UniqueEntityID('fake_answer_id'),
      }),
    )

    const result = await sut.execute({
      answer_id: 'fake_answer_id',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer_comments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer commnets', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answer_id: new UniqueEntityID('fake_answer_id'),
        }),
      )
    }

    const result = await sut.execute({
      answer_id: 'fake_answer_id',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer_comments).toHaveLength(2)
  })
})
