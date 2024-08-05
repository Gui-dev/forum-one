import { IQuestionsRepository } from '../../repositories/questions-repository'
import { CreateQuestionUseCase } from '../create-question'

const fakeQuestionsRepository: IQuestionsRepository = {
  create: async () => {
    return
  },
}

describe('Create Question Use Case', () => {
  it('should be able to create a new question', async () => {
    const sut = new CreateQuestionUseCase(fakeQuestionsRepository)
    const { question } = await sut.execute({
      author_id: 'fake_author_id',
      title: 'Fake title',
      content: 'Fake content',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('Fake content')
  })
})
