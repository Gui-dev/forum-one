import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachements-repository'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { CommentOnAnswerUseCase } from '../comment-on-answer'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })
  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      author_id: answer.author_id.toString(),
      answer_id: answer.id.toString(),
      content: 'Fake content',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)
    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Fake content',
    )
  })
})
