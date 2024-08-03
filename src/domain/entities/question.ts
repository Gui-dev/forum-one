import dayjs from 'dayjs'

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

  public static create(props: Optional<IQuestionProps, 'created_at' | 'slug'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      created_at: new Date()
    }, id)

    return question
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get isNew(): boolean {
    return dayjs().diff(this.created_at, 'days') <= 3
  }

  get author_id() {
    return this.props.author_id
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.content = content;
    this.touch()
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }
}