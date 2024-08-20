import { Optional } from '@/@types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

interface INotificationProps {
  recipient_id: UniqueEntityID
  title: string
  content: string
  created_at: Date
  read_at?: Date
}

export class Notification extends Entity<INotificationProps> {
  public static create(
    props: Optional<INotificationProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const notification = new Notification(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return notification
  }

  get recipient_id() {
    return this.props.recipient_id
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get created_at() {
    return this.props.created_at
  }

  get read_at() {
    return this.props.read_at
  }
}
