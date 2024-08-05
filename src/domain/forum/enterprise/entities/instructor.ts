import { Entity } from '@/core/entities/entity'

import { UniqueEntityID } from './value-objects/unique-entity-id'

interface IIntructorProps {
  name: string
}

export class Intructor extends Entity<IIntructorProps> {
  public static create(props: IIntructorProps, id?: UniqueEntityID) {
    const instructor = new Intructor(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return instructor
  }
}
