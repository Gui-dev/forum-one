import { Optional } from '@/@types/optional'
import { Entity } from '@/core/entities/entity'

import { UniqueEntityID } from './value-objects/unique-entity-id'

interface IStudentProps {
  name: string
}

export class Student extends Entity<IStudentProps> {
  public static create(props: IStudentProps, id?: UniqueEntityID) {
    const student = new Student(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return student
  }
}
