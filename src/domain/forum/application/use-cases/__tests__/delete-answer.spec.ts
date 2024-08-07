import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { DeleteAnswerUseCase } from '../delete-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer', async () => {
    const newQuestion = makeAnswer(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_answer_id'),
    )

    await inMemoryAnswersRepository.create(newQuestion)
    await sut.execute({
      answer_id: 'fake_answer_id',
      author_id: newQuestion.author_id.toString(),
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newQuestion = makeAnswer(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_answer_id'),
    )

    await inMemoryAnswersRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        answer_id: 'fake_answer_id',
        author_id: 'faker_another_author_id',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
