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
    const result = doSomething(true)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })

  it('should be able to error result', () => {
    const result = doSomething(false)

    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
  })
})
