import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { DomainEvent } from '../domain-event'
import { DomainEvents } from '../domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    throw new Error('Method not implemented.')
  }
}

class CustomAggregate extends AggregateRoot<null> {
  public static create() {
    const aggregate = new CustomAggregate(null)
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)
    const aggregate = CustomAggregate.create()

    expect(aggregate.domainEvents).toHaveLength(1)

    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
