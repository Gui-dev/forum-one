import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { ChooseQuestionBestAnswerUseCase } from '../choose-question-best-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })
  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer(
      {
        question_id: question.id,
      },
      new UniqueEntityID('fake_answer_id'),
    )
    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      author_id: question.author_id.toString(),
      answer_id: answer.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      author_id: new UniqueEntityID('fake_author_id'),
    })
    const answer = makeAnswer(
      {
        question_id: question.id,
      },
      new UniqueEntityID('fake_answer_id'),
    )
    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await expect(() => {
      return sut.execute({
        author_id: 'faker_another_author_id',
        answer_id: answer.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
