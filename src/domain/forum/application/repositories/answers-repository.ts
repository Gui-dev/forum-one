import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface IAnswersRepository {
  findById(answer_id: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
