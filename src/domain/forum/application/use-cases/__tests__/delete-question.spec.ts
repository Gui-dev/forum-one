import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { DeleteQuestionUseCase } from '../delete-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to dellete a question', async () => {
    const newQuestion = makeQuestion(
      {
        author_id: new UniqueEntityID('fake_author_id'),
      },
      new UniqueEntityID('fake_question_id'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)
    await sut.execute({
      author_id: newQuestion.author_id.toString(),
      question_id: 'fake_question_id',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
})
