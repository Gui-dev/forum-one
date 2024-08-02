import { Entity } from "../../core/entities/entity"

interface IAnswerProps {
  author_id: string
  question_id: string
  content: string
}

export class Answer extends Entity<IAnswerProps> {}