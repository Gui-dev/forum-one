import { IPaginationParams } from '@/core/repositories/pagination-params'

import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface IAnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answer_id: string,
    params: IPaginationParams,
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
