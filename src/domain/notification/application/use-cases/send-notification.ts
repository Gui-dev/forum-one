import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

import { Notification } from '../../enterprise/entities/notification'
import { INotificationsRepository } from '../repositories/notifications-repository'

interface ISendNotificationUseCaseRequest {
  recipient_id: string
  title: string
  content: string
}

type ISendNotificationUseCaseResponse = Either<
  null,
  { notification: Notification }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  public async execute({
    recipient_id,
    title,
    content,
  }: ISendNotificationUseCaseRequest): Promise<ISendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipient_id: new UniqueEntityID(recipient_id),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
