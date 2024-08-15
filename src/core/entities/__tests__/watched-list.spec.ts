import { WatchedList } from '../watched-list'

class NumberWatchedList extends WatchedList<number> {
  public compareItems(a: number, b: number): boolean {
    return a === b
  }
}

let sut: NumberWatchedList
describe('Watched List', () => {
  beforeEach(() => {
    sut = new NumberWatchedList([1, 2, 3])
  })
  it('should be able to create a watched list with initial items', () => {
    expect(sut.currentItems).toHaveLength(3)
  })

  it('should be able to add new items to the list', () => {
    sut.add(4)

    expect(sut.currentItems).toHaveLength(4)
    expect(sut.getNewItems()).toEqual([4])
  })

  it('should be able to remove items from the list', () => {
    sut.remove(2)

    expect(sut.currentItems).toHaveLength(2)
    expect(sut.getRemovedItems()).toEqual([2])
  })

  it('should be able to add an item  even if it was removed before', () => {
    sut.remove(2)
    sut.add(2)

    expect(sut.currentItems).toHaveLength(3)
    expect(sut.getRemovedItems()).toEqual([])
    expect(sut.getNewItems()).toEqual([])
  })

  it('should be able to remove an item even if it was added before', () => {
    sut.add(4)
    sut.remove(4)

    expect(sut.currentItems).toHaveLength(3)
    expect(sut.getRemovedItems()).toEqual([])
    expect(sut.getNewItems()).toEqual([])
  })

  it('should be able to update watched list items', () => {
    sut.update([1, 3, 5])

    expect(sut.currentItems).toHaveLength(3)
    expect(sut.getRemovedItems()).toEqual([2])
    expect(sut.getNewItems()).toEqual([5])
  })
})
