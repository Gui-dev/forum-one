import { Question } from '@/domain/forum/enterprise/entities/question'

export interface IQuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
