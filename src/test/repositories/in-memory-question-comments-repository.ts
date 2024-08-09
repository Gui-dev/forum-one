/* eslint-disable prettier/prettier */
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository {
  public items: QuestionComment[] = []

  public async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  public async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  public async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)
    this.items.splice(itemIndex, 1)
  }
}
