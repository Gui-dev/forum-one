/* eslint-disable prettier/prettier */
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository {
  public items: AnswerComment[] = []

  public async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
