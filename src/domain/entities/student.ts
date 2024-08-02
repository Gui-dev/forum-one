import { Entity } from "../../core/entities/entity"

interface IStudentProps {
  name: string
}

export class Student extends Entity<IStudentProps> {}