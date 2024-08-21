import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { IAnswersRepository } from '../repositories/answers-repository'

interface ICommentOnAnswerUseCaseRequest {
  author_id: string
  answer_id: string
  content: string
}

type ICommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer_comment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  public async execute({
    author_id,
    answer_id,
    content,
  }: ICommentOnAnswerUseCaseRequest): Promise<ICommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answer_id)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answer_comment = AnswerComment.create({
      author_id: new UniqueEntityID(author_id),
      answer_id: answer.id,
      content,
    })

    await this.answerCommentsRepository.create(answer_comment)

    return right({ answer_comment })
  }
}
