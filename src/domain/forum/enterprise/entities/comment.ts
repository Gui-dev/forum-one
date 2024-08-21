import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ICommentProps {
  author_id: UniqueEntityID
  content: string
  created_at: Date
  updated_at?: Date
}

export abstract class Comment<
  Props extends ICommentProps,
> extends Entity<Props> {
  private touch() {
    this.props.updated_at = new Date()
  }

  get author_id() {
    return this.props.author_id
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }
}
