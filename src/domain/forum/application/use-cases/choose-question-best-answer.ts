import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface IChooseQuestionBestAnswerUseCaseRequest {
  author_id: string
  answer_id: string
}

interface IChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

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
      throw new Error('Answer not found')
    }

    const question = await this.questionRepository.findById(
      answer.question_id.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (author_id !== question.author_id.toString()) {
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id
    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
