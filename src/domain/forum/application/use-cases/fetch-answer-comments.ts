import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface IFetchAnswerCommentsUseCaseRequest {
  answer_id: string
  page: number
}

interface IFetchAnswerCommentsUseCaseResponse {
  answer_comments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  public async execute({
    answer_id,
    page,
  }: IFetchAnswerCommentsUseCaseRequest): Promise<IFetchAnswerCommentsUseCaseResponse> {
    const answer_comments =
      await this.answerCommentsRepository.findManyByAnswerId(answer_id, {
        page,
      })

    return {
      answer_comments,
    }
  }
}
