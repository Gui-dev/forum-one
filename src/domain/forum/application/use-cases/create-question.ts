import { Either, right } from '@/core/either'

import { Question } from '../../enterprise/entities/question'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface ICreateQuestionUseCaseRequest {
  author_id: string
  title: string
  content: string
  attachments_ids: string[]
}

type ICreateQuestionUseCaseResponse = Either<null, { question: Question }>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute({
    author_id,
    title,
    content,
    attachments_ids,
  }: ICreateQuestionUseCaseRequest): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({
      author_id: new UniqueEntityID(author_id),
      title,
      content,
    })

    const questionAttachments = attachments_ids.map((attachementId) => {
      return QuestionAttachment.create({
        attachment_id: new UniqueEntityID(attachementId),
        question_id: question.id,
      })
    })

    question.attachments = questionAttachments

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
