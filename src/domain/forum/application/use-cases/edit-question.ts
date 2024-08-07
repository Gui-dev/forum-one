import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/questions-repository'

interface IEditQuestionUseCaseRequest {
  author_id: string
  question_id: string
  title: string
  content: string
}

interface IEditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute({
    author_id,
    question_id,
    title,
    content,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(question_id)

    if (!question) {
      throw new Error('Question not found')
    }

    if (author_id !== question.author_id.toString()) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
