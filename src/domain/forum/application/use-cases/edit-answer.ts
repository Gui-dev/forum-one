import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { IAnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { IAnswersRepository } from '../repositories/answers-repository'

interface IEditAnswerUseCaseRequest {
  author_id: string
  answer_id: string
  attachments_ids: string[]
  content: string
}

type IEditAnserUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerAttachmentsRepository: IAnswerAttachmentsRepository,
  ) {}

  public async execute({
    author_id,
    answer_id,
    attachments_ids,
    content,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnserUseCaseResponse> {
    const answer = await this.answersRepository.findById(answer_id)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (author_id !== answer.author_id.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answer_id)
    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachments_ids.map((attachementId) => {
      return AnswerAttachment.create({
        attachment_id: new UniqueEntityID(attachementId),
        answer_id: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
