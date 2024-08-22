import { MockInstance } from 'vitest'

import { makeAnswer } from '@/test/factories/make-answer'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachements-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryNotificationsReposiotry } from '@/test/repositories/in-memory-notifications-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachements-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { waitFor } from '@/test/utils/wait-for'

import { SendNotificationUseCase } from '../../use-cases/send-notification'
import { OnQuestionBestAnswerChosenEvent } from '../on-question-best-answer-chosen-event'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryNotificationsReposiotry: InMemoryNotificationsReposiotry
let sendNotificationUseCase: SendNotificationUseCase
let sut: OnQuestionBestAnswerChosenEvent // eslint-disable-line

let sendNotificationExecuteSpy: MockInstance
describe('On Question Best Answer Chosen Event', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryNotificationsReposiotry = new InMemoryNotificationsReposiotry()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsReposiotry,
    )
    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')
    sut = new OnQuestionBestAnswerChosenEvent(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })

  it('should be able send a notification when an question has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ question_id: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id
    await inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
