import { UniqueEntityID } from '../../domain/entities/value-objects/unique-entity-id'

export class Entity<IProps> {
  private _id: UniqueEntityID
  protected props: IProps

  protected constructor(props: IProps, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  get id() {
    return this._id
  }
}
