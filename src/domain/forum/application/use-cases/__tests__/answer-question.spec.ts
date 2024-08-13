import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create a new answer', async () => {
    const resullt = await sut.execute({
      instructor_id: 'fake_instructor_id',
      question_id: 'fake_question_id',
      content: 'Fake content',
    })

    expect(resullt.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(resullt.value?.answer)
  })
})
