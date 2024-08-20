import { InMemoryNotificationsReposiotry } from '@/test/repositories/in-memory-notifications-repository'

import { SendNotificationUseCase } from '../send-notification'

let inMemoryNotificationsReposiotry: InMemoryNotificationsReposiotry
let sut: SendNotificationUseCase

describe('Send Notification Use Case', () => {
  beforeEach(() => {
    inMemoryNotificationsReposiotry = new InMemoryNotificationsReposiotry()
    sut = new SendNotificationUseCase(inMemoryNotificationsReposiotry)
  })
  it('should be able to send a new notification', async () => {
    const result = await sut.execute({
      recipient_id: 'fake_recipient_id',
      title: 'Fake title',
      content: 'Fake content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsReposiotry.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
