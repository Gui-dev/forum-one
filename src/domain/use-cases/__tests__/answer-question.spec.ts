import { IAnswerRepository } from '@/domain/repositories/answer-repository'
import { AnswerQuestionUseCase } from '@/domain/use-cases/answer-question'

const fakeAnswerRepository: IAnswerRepository = {
  create: async () => {
    return
  },
}

describe('Answer Question Use Case', () => {
  it('should be able to create a new answer', async () => {
    const sut = new AnswerQuestionUseCase(fakeAnswerRepository)
    const answer = await sut.execute({
      instructor_id: 'fake_instructor_id',
      question_id: 'fake_question_id',
      content: 'Fake content',
    })

    expect(answer.content).toEqual('Fake content')
  })
})
