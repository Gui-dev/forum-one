import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen-event'

import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnQuestionBestAnswerChosenEvent implements EventHandler {
  constructor(
    private answerRepository: IAnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestQuestionId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(
      bestQuestionId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipient_id: answer.author_id.toString(),
        title: `Nova resposta foi escolhida`,
        content: `A resposta que você enviou em "${question.title.substring(0, 20).concat('...')}" foi escolhida pelo autor!`,
      })
    }
  }
}
