import { Entity } from '@/core/entities/entity'

import { UniqueEntityID } from './value-objects/unique-entity-id'

interface IAttachmentProps {
  title: string
  link: string
}

export class Attachment extends Entity<IAttachmentProps> {
  public static create(props: IAttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)

    return attachment
  }

  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }
}
