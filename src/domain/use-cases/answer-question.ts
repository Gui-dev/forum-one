import { Answer } from "@/domain/entities/answer"
import { UniqueEntityID } from "@/domain/entities/value-objects/unique-entity-id"
import { IAnswerRepository } from "@/domain/repositories/answer-repository"

interface IAnswerQuestionUseCaseRequest {
  instructor_id: string
  question_id: string
  content: string
}

export class AnswerQuestionUseCase {

  constructor(private answerRepository: IAnswerRepository) {}

  public async execute({ instructor_id, question_id, content }: IAnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      author_id: new UniqueEntityID(instructor_id),
      question_id: new UniqueEntityID(question_id),
      content
    })

    await this.answerRepository.create(answer)

    return answer
  }
}