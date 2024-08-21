import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface ICommentOnQuestionUseCaseRequest {
  author_id: string
  question_id: string
  content: string
}

type ICommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question_comment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  public async execute({
    author_id,
    question_id,
    content,
  }: ICommentOnQuestionUseCaseRequest): Promise<ICommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(question_id)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const question_comment = QuestionComment.create({
      author_id: new UniqueEntityID(author_id),
      question_id: question.id,
      content,
    })

    await this.questionCommentsRepository.create(question_comment)

    return right({ question_comment })
  }
}
