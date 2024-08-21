import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Question } from '../../enterprise/entities/question'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { IQuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface IEditQuestionUseCaseRequest {
  author_id: string
  question_id: string
  attachments_ids: string[]
  title: string
  content: string
}

type IEditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository,
  ) {}

  public async execute({
    author_id,
    question_id,
    attachments_ids,
    title,
    content,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(question_id)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (author_id !== question.author_id.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(question_id)
    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachments_ids.map((attachementId) => {
      return QuestionAttachment.create({
        attachment_id: new UniqueEntityID(attachementId),
        question_id: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
