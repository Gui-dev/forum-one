import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'

interface IDeleteQuestionCommentnUseCaseRequest {
  author_id: string
  question_comment_id: string
}

interface IDeleteQuestionCommentnUseCaseResponse {}

export class DeleteQuestionCommentnUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  public async execute({
    author_id,
    question_comment_id,
  }: IDeleteQuestionCommentnUseCaseRequest): Promise<IDeleteQuestionCommentnUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(question_comment_id)

    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (questionComment.author_id.toString() !== author_id) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
