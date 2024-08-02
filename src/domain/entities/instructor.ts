import { Entity } from "../../core/entities/entity"

interface IIntructorProps {
  name: string
}

export class Intructor extends Entity<IIntructorProps> {

  constructor(props: IIntructorProps, id?: string) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }
}