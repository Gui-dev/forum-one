import { Either, right } from '@/core/either'

import { Answer } from '../../enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/answers-repository'

interface IFetchQuestionAnswersUseCaseRequest {
  question_id: string
  page: number
}

type IFetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  public async execute({
    question_id,
    page,
  }: IFetchQuestionAnswersUseCaseRequest): Promise<IFetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      question_id,
      { page },
    )

    return right({
      answers,
    })
  }
}
