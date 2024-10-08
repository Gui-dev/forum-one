/* eslint-disable prettier/prettier */
import { IPaginationParams } from '@/core/repositories/pagination-params'
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

  public async findManyByQuestionId(question_id: string, { page }: IPaginationParams): Promise<QuestionComment[]> {
    const questionComments = this.items
      .filter((item) => item.question_id.toString() === question_id)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  public async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  public async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)
    this.items.splice(itemIndex, 1)
  }
}
