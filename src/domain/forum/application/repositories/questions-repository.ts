import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'

export interface IQuestionsRepository {
  findById(question_id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: IPaginationParams): Promise<Question[]>
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
