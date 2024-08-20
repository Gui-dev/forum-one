import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Notification } from '../../enterprise/entities/notification'
import { INotificationsRepository } from '../repositories/notifications-repository'

interface IReadNotificationUseCaseRequest {
  recipient_id: string
  notification_id: string
}

type IReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { notification: Notification }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  public async execute({
    recipient_id,
    notification_id,
  }: IReadNotificationUseCaseRequest): Promise<IReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notification_id)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipient_id !== notification.recipient_id.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()
    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}
