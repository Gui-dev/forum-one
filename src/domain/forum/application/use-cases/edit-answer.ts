import { Either, left, right } from '@/core/either'

import { Answer } from '../../enterprise/entities/answer'
import { NotAllowedError } from '../errors/not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { IAnswersRepository } from '../repositories/answers-repository'

interface IEditAnswerUseCaseRequest {
  author_id: string
  question_id: string
  content: string
}

type IEditAnserUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  public async execute({
    author_id,
    question_id,
    content,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnserUseCaseResponse> {
    const answer = await this.answersRepository.findById(question_id)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (author_id !== answer.author_id.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
