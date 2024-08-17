import { Either, right } from '@/core/either'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'

interface IAnswerQuestionUseCaseRequest {
  instructor_id: string
  question_id: string
  attachments_ids: string[]
  content: string
}

type IAnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  public async execute({
    instructor_id,
    question_id,
    attachments_ids,
    content,
  }: IAnswerQuestionUseCaseRequest): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      author_id: new UniqueEntityID(instructor_id),
      question_id: new UniqueEntityID(question_id),
      content,
    })

    const answerAttachments = attachments_ids.map((attachementId) => {
      return AnswerAttachment.create({
        attachment_id: new UniqueEntityID(attachementId),
        answer_id: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
