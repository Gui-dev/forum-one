/* eslint-disable prettier/prettier */
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository {
  public items: AnswerComment[] = []

  public async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  public async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  public async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id)
    this.items.splice(itemIndex, 1)
  }
}
