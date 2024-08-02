import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "./value-objects/unique-entity-id"
import { Optional } from "../../@types/optional"

interface IQuestionProps {
  author_id: UniqueEntityID
  title: string
  slug: Slug
  content: string
  bestAnswerId?: UniqueEntityID
  created_at: Date
  updated_at?: Date
}

export class Question extends Entity<IQuestionProps> {

  public static create(props: Optional<IQuestionProps, 'created_at'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      created_at: new Date()
    }, id)

    return question
  }
}