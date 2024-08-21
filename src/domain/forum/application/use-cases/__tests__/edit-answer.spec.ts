import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeAnswer } from '@/test/factories/make-answer'
import { makeAnswerAttachment } from '@/test/factories/make-answer-attachment'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachements-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { EditAnswerUseCase } from '../edit-answer'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    )
  })
  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_answer_id'),
    )

    await inMemoryAnswersRepository.create(newAnswer)
    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answer_id: newAnswer.id,
        attachment_id: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answer_id: newAnswer.id,
        attachment_id: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      author_id: 'fake_author_id',
      answer_id: newAnswer.id.toValue(),
      attachments_ids: ['1', '3'],
      content: 'Fake content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Fake content',
    })
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachment_id: new UniqueEntityID('1') }),
        expect.objectContaining({ attachment_id: new UniqueEntityID('3') }),
      ],
    )
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_answer_id'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      author_id: 'faker_another_author_id',
      answer_id: newAnswer.id.toValue(),
      attachments_ids: ['1', '2'],
      content: 'Fake content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
