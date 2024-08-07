import { IAnswersRepository } from '../repositories/answers-repository'

interface IDeleteAnswerUseCaseRequest {
  author_id: string
  answer_id: string
}

interface IDeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  public async execute({
    author_id,
    answer_id,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answer_id)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (author_id !== answer.author_id.toString()) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
