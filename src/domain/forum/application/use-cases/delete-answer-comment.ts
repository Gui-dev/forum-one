import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface IDeleteAnswerCommentnUseCaseRequest {
  author_id: string
  answer_comment_id: string
}

type IDeleteAnswerCommentnUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteAnswerCommentnUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  public async execute({
    author_id,
    answer_comment_id,
  }: IDeleteAnswerCommentnUseCaseRequest): Promise<IDeleteAnswerCommentnUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answer_comment_id)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.author_id.toString() !== author_id) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
