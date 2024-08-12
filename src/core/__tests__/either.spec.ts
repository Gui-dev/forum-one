import { Either, left, right } from '../either'

const doSomething = (shouldSuccess: boolean): Either<string, string> => {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

describe('Either', () => {
  it('should be able to success result', () => {
    const successResult = doSomething(true)

    expect(successResult.isRight()).toBe(true)
    expect(successResult.isLeft()).toBe(false)
  })
})
