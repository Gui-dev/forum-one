import { Answer } from "../entities/answer"
import { IAnswerRepository } from "../repositories/answer-repository"

interface IAnswerQuestionUseCaseRequest {
  instructor_id: string
  question_id: string
  content: string
}

export class AnswerQuestionUseCase {

  constructor(private answerRepository: IAnswerRepository) {}

  public async execute({ instructor_id, question_id, content }: IAnswerQuestionUseCaseRequest) {
    const answer = new Answer({ author_id: instructor_id, question_id, content })

    await this.answerRepository.create(answer)

    return answer
  }
}