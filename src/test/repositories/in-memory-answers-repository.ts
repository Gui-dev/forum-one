import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements IAnswersRepository {
  public items: Answer[] = []

  public async findById(answer_id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === answer_id)

    if (!answer) {
      return null
    }

    return answer
  }

  public async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  public async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)
  }
}
