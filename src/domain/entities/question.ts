import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"

interface IQuestionProps {
  author_id: string
  title: string
  slug: Slug
  content: string
}

export class Question extends Entity<IQuestionProps> {}