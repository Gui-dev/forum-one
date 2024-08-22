import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'

import { Question } from '../entities/question'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Question
  public bestQuestionId: UniqueEntityID

  constructor(question: Question, bestQuestionId: UniqueEntityID) {
    this.question = question
    this.bestQuestionId = bestQuestionId
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    throw this.question.id
  }
}
