/* eslint-disable prettier/prettier */
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository {
  public items: QuestionComment[] = []

  public async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
