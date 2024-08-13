import { Either, right } from '@/core/either'

import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'

interface IFetchQuestionCommentsUseCaseRequest {
  question_id: string
  page: number
}

type IFetchQuestionCommentsUseCaseResponse = Either<
  null,
  { question_comments: QuestionComment[] }
>

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  public async execute({
    question_id,
    page,
  }: IFetchQuestionCommentsUseCaseRequest): Promise<IFetchQuestionCommentsUseCaseResponse> {
    const question_comments =
      await this.questionCommentsRepository.findManyByQuestionId(question_id, {
        page,
      })

    return right({
      question_comments,
    })
  }
}
