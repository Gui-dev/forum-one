import { Either, left, right } from '@/core/either'

import { NotAllowedError } from '../errors/not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'

interface IDeleteQuestionCommentnUseCaseRequest {
  author_id: string
  question_comment_id: string
}

type IDeleteQuestionCommentnUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

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
      return left(new ResourceNotFoundError())
    }

    if (questionComment.author_id.toString() !== author_id) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right({})
  }
}
