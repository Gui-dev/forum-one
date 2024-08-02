import { Optional } from "../../@types/optional"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "./value-objects/unique-entity-id"

interface IAnswerProps {
  author_id: UniqueEntityID
  question_id: UniqueEntityID
  content: string
  created_at: Date
  updated_at?: Date
}

export class Answer extends Entity<IAnswerProps> {

  public static create(props: Optional<IAnswerProps, 'created_at'>, id?: UniqueEntityID) {
    const answer = new Answer({
      ...props,
      created_at: new Date()
    }, id)

    return answer
  }

  get content() {
    return this.props.content
  }
}