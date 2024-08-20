/* eslint-disable prettier/prettier */
import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsReposiotry
  implements INotificationsRepository {
  public items: Notification[] = []
  public async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}
