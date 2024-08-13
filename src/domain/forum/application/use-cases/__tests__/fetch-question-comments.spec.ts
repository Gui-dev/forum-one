import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestionComment } from '@/test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from '@/test/repositories/in-memory-question-comments-repository'

import { FetchQuestionCommentsUseCase } from '../fetch-question-comments'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })
  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        question_id: new UniqueEntityID('fake_question_id'),
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        question_id: new UniqueEntityID('fake_question_id'),
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        question_id: new UniqueEntityID('fake_question_id'),
      }),
    )

    const result = await sut.execute({
      question_id: 'fake_question_id',
      page: 1,
    })

    expect(result.value?.question_comments).toHaveLength(3)
  })

  it('should be able to fetch paginated question commnets', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          question_id: new UniqueEntityID('fake_question_id'),
        }),
      )
    }

    const result = await sut.execute({
      question_id: 'fake_question_id',
      page: 2,
    })

    expect(result.value?.question_comments).toHaveLength(2)
  })
})
