import { IQuestionsRepository } from '../repositories/questions-repository'

interface IDeleteQuestionUseCaseRequest {
  author_id: string
  question_id: string
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute({
    author_id,
    question_id,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(question_id)

    if (!question) {
      throw new Error('Question not found')
    }

    if (author_id !== question.author_id.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
