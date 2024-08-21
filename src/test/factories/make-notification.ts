import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  INotificationProps,
  Notification,
} from '@/domain/notification/enterprise/entities/notification'

export const makeNotification = (
  override: Partial<INotificationProps> = {},
  id?: UniqueEntityID,
) => {
  const notification = Notification.create(
    {
      recipient_id: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}
