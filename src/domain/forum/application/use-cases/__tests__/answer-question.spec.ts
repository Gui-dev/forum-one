import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachements-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create a new answer', async () => {
    const resullt = await sut.execute({
      instructor_id: 'fake_instructor_id',
      question_id: 'fake_question_id',
      attachments_ids: ['1', '2'],
      content: 'Fake content',
    })

    expect(resullt.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(resullt.value?.answer)

    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachment_id: new UniqueEntityID('1') }),
        expect.objectContaining({ attachment_id: new UniqueEntityID('2') }),
      ],
    )
  })
})
