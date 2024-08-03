import { describe, expect, it } from 'vitest'

import { Slug } from '../slug'

describe('Slug => Value Objects', () => {
  it('should be able to create a new slug', async () => {
    const sut = Slug.createFromText('Fake example slug')

    expect(sut.value).toEqual('fake-example-slug')
  })
})
