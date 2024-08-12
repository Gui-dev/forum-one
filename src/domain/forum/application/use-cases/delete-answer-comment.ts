import { Either, left, right } from '@/core/either'

import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface IDeleteAnswerCommentnUseCaseRequest {
  author_id: string
  answer_comment_id: string
}

type IDeleteAnswerCommentnUseCaseResponse = Either<string, object>

export class DeleteAnswerCommentnUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  public async execute({
    author_id,
    answer_comment_id,
  }: IDeleteAnswerCommentnUseCaseRequest): Promise<IDeleteAnswerCommentnUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answer_comment_id)

    if (!answerComment) {
      throw left('Answer comment not found')
    }

    if (answerComment.author_id.toString() !== author_id) {
      throw left('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
