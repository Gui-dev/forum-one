import { QuestionComment } from '../../enterprise/entities/question-comment'
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface ICommentOnQuestionUseCaseRequest {
  author_id: string
  question_id: string
  content: string
}

interface ICommentOnQuestionUseCaseResponse {
  question_comment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  public async execute({
    author_id,
    question_id,
    content,
  }: ICommentOnQuestionUseCaseRequest): Promise<ICommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(question_id)

    if (!question) {
      throw new Error('Question not found')
    }

    const question_comment = QuestionComment.create({
      author_id: new UniqueEntityID(author_id),
      question_id: question.id,
      content,
    })

    await this.questionCommentsRepository.create(question_comment)

    return { question_comment }
  }
}
