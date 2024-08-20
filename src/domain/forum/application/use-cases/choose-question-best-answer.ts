import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface IChooseQuestionBestAnswerUseCaseRequest {
  author_id: string
  answer_id: string
}

type IChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: IQuestionsRepository,
    private answerRepository: IAnswersRepository,
  ) {}

  public async execute({
    author_id,
    answer_id,
  }: IChooseQuestionBestAnswerUseCaseRequest): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answer_id)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.question_id.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (author_id !== question.author_id.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id
    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
