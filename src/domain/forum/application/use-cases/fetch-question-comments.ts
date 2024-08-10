import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'

interface IFetchQuestionCommentsUseCaseRequest {
  question_id: string
  page: number
}

interface IFetchQuestionCommentsUseCaseResponse {
  question_comments: QuestionComment[]
}

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

    return {
      question_comments,
    }
  }
}
