import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestion } from '@/test/factories/make-question'
import { makeQuestionAttachment } from '@/test/factories/make-question-attachment'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachements-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { NotAllowedError } from '../@/core/errors/errors/not-allowed-error'
import { DeleteQuestionUseCase } from '../delete-question'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to delete a question', async () => {
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
      author_id: newQuestion.author_id.toString(),
      question_id: 'fake_question_id',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_question_id'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      author_id: 'faker_another_author_id',
      question_id: 'fake_question_id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
