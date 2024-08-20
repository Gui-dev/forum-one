import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestion } from '@/test/factories/make-question'
import { makeQuestionAttachment } from '@/test/factories/make-question-attachment'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachements-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { NotAllowedError } from '../@/core/errors/errors/not-allowed-error'
import { EditQuestionUseCase } from '../edit-question'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    )
  })
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_question_id'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)
    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        question_id: newQuestion.id,
        attachment_id: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        question_id: newQuestion.id,
        attachment_id: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      author_id: 'fake_author_id',
      question_id: newQuestion.id.toValue(),
      attachments_ids: ['1', '3'],
      title: 'Fake title',
      content: 'Fake content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Fake title',
      content: 'Fake content',
    })
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachment_id: new UniqueEntityID('1') }),
      expect.objectContaining({ attachment_id: new UniqueEntityID('3') }),
    ])
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_question_id'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      author_id: 'faker_another_author_id',
      question_id: newQuestion.id.toValue(),
      attachments_ids: ['1', '3'],
      title: 'Fake title',
      content: 'Fake content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
