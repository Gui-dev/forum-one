import { Question } from '@/domain/forum/enterprise/entities/question'

export interface IQuestionsRepository {
  create(answer: Question): Promise<void>
}
