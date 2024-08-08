import { IPaginationParams } from '@/core/repositories/pagination-params'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = []

  public async findById(question_id: string): Promise<Question | null> {
    const question = this.items.find(
      (item) => item.id.toString() === question_id,
    )

    if (!question) {
      return null
    }

    return question
  }

  public async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  public async findManyRecent({
    page,
  }: IPaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  public async create(quesion: Question): Promise<void> {
    this.items.push(quesion)
  }

  public async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items[itemIndex] = question
  }

  public async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(itemIndex, 1)
  }
}
