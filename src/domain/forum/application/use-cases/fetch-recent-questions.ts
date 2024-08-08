import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface IFetchRecentQuestionsUseCaseRequest {
  page: number
}

interface IFetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute({
    page,
  }: IFetchRecentQuestionsUseCaseRequest): Promise<IFetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
