import { Answer } from '../../enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/answers-repository'

interface IEditAnswerUseCaseRequest {
  author_id: string
  question_id: string
  content: string
}

interface IEditAnserUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  public async execute({
    author_id,
    question_id,
    content,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnserUseCaseResponse> {
    const answer = await this.answersRepository.findById(question_id)

    if (!answer) {
      throw new Error('Question not found')
    }

    if (author_id !== answer.author_id.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {
      answer,
    }
  }
}
