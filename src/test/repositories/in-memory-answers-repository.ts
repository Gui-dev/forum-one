import { DomainEvents } from '@/core/events/domain-events'
import { IPaginationParams } from '@/core/repositories/pagination-params'
import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements IAnswersRepository {
  constructor(
    private answerAttachmentsRepository: IAnswerAttachmentsRepository,
  ) {}

  public items: Answer[] = []

  public async findById(answer_id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === answer_id)

    if (!answer) {
      return null
    }

    return answer
  }

  public async findManyByQuestionId(
    question_id: string,
    { page }: IPaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.question_id.toString() === question_id)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  public async create(answer: Answer): Promise<void> {
    this.items.push(answer)
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  public async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[itemIndex] = answer
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  public async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
