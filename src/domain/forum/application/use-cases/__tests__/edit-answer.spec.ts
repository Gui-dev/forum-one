import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { EditAnswerUseCase } from '../edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to edit a answer', async () => {
    const newQuestion = makeAnswer(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_answer_id'),
    )

    await inMemoryAnswersRepository.create(newQuestion)
    await sut.execute({
      author_id: 'fake_author_id',
      question_id: newQuestion.id.toValue(),
      content: 'Fake content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Fake content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newQuestion = makeAnswer(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_answer_id'),
    )

    await inMemoryAnswersRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        author_id: 'faker_another_author_id',
        question_id: newQuestion.id.toValue(),
        content: 'Fake content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
