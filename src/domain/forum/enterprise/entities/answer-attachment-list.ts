import { WatchedList } from '@/core/entities/watched-list'

import { AnswerAttachment } from './answer-attachment'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  public compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachment_id.equals(b.attachment_id)
  }
}
