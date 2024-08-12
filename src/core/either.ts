export class Left<L> {
  public readonly value: L

  constructor(value: L) {
    this.value = value
  }
}

export class Right<R> {
  public readonly value: R

  constructor(value: R) {
    this.value = value
  }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
