import { expect } from 'vitest'

import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { FetchQuestionAnswersUseCase } from '../fetch-question-answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })
  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        question_id: new UniqueEntityID('fake_question_id'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        question_id: new UniqueEntityID('fake_question_id'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        question_id: new UniqueEntityID('fake_question_id'),
      }),
    )
    const result = await sut.execute({
      question_id: 'fake_question_id',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          question_id: new UniqueEntityID(`fake_question_id`),
        }),
      )
    }

    const result = await sut.execute({
      question_id: 'fake_question_id',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
