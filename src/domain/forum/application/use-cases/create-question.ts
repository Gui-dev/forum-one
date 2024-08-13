import { Either, right } from '@/core/either'

import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface ICreateQuestionUseCaseRequest {
  author_id: string
  title: string
  content: string
}

type ICreateQuestionUseCaseResponse = Either<null, { question: Question }>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute({
    author_id,
    title,
    content,
  }: ICreateQuestionUseCaseRequest): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({
      author_id: new UniqueEntityID(author_id),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
