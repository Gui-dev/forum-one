import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface IDeleteAnswerCommentnUseCaseRequest {
  author_id: string
  answer_comment_id: string
}

interface IDeleteAnswerCommentnUseCaseResponse {}

export class DeleteAnswerCommentnUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  public async execute({
    author_id,
    answer_comment_id,
  }: IDeleteAnswerCommentnUseCaseRequest): Promise<IDeleteAnswerCommentnUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answer_comment_id)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (answerComment.author_id.toString() !== author_id) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
