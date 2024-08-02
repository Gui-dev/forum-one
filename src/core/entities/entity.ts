import { UniqueEntityID } from "../../domain/entities/value-objects/unique-entity-id"

export class Entity<IProps> {
  private _id: UniqueEntityID
  protected props: IProps

  constructor(props: any, id?: string) {
    this._id = new UniqueEntityID(id)
    this.props = props
  }

  get id() {
    return this._id
  }
}