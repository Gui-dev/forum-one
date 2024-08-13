import { Either, right } from '@/core/either'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

interface IAnswerQuestionUseCaseRequest {
  instructor_id: string
  question_id: string
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
    content,
  }: IAnswerQuestionUseCaseRequest): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      author_id: new UniqueEntityID(instructor_id),
      question_id: new UniqueEntityID(question_id),
      content,
    })

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
