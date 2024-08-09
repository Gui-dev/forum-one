import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id'
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { IAnswersRepository } from '../repositories/answers-repository'

interface ICommentOnAnswerUseCaseRequest {
  author_id: string
  answer_id: string
  content: string
}

interface ICommentOnAnswerUseCaseResponse {
  answer_comment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  public async execute({
    author_id,
    answer_id,
    content,
  }: ICommentOnAnswerUseCaseRequest): Promise<ICommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answer_id)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answer_comment = AnswerComment.create({
      author_id: new UniqueEntityID(author_id),
      answer_id: answer.id,
      content,
    })

    await this.answerCommentsRepository.create(answer_comment)

    return { answer_comment }
  }
}
