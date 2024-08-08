import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface IAnswersRepository {
  findById(answer_id: string): Promise<Answer | null>
  findManyByQuestionId(
    question_id: string,
    params: IPaginationParams,
  ): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
