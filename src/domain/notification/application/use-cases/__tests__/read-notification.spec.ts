import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeNotification } from '@/test/factories/make-notification'
import { InMemoryNotificationsReposiotry } from '@/test/repositories/in-memory-notifications-repository'

import { ReadNotificationUseCase } from '../read-notification'

let inMemoryNotificationsReposiotry: InMemoryNotificationsReposiotry
let sut: ReadNotificationUseCase

describe('Read Notification Use Case', () => {
  beforeEach(() => {
    inMemoryNotificationsReposiotry = new InMemoryNotificationsReposiotry()
    sut = new ReadNotificationUseCase(inMemoryNotificationsReposiotry)
  })
  it('should be able to read a notification', async () => {
    const notification = makeNotification()
    await inMemoryNotificationsReposiotry.create(notification)

    const result = await sut.execute({
      recipient_id: notification.recipient_id.toString(),
      notification_id: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsReposiotry.items[0].read_at).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipient_id: new UniqueEntityID('fake_recipient_id'),
    })
    await inMemoryNotificationsReposiotry.create(notification)

    const result = await sut.execute({
      recipient_id: 'fake_another_recipient_id',
      notification_id: notification.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
