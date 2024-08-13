import { Either, left, right } from '@/core/either'

import { NotAllowedError } from '../errors/not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { IAnswersRepository } from '../repositories/answers-repository'

interface IDeleteAnswerUseCaseRequest {
  author_id: string
  answer_id: string
}

type IDeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  public async execute({
    author_id,
    answer_id,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answer_id)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (author_id !== answer.author_id.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right({})
  }
}
