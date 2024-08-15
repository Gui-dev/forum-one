import { WatchedList } from '../watched-list'

class NumberWatchedList extends WatchedList<number> {
  public compareItems(a: number, b: number): boolean {
    return a === b
  }
}

// let sut: NumberWatchedList
describe('Watched List', () => {
  // beforeEach(() => {
  //   sut = new NumberWatchedList()
  // })
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    expect(list.currentItems).toHaveLength(3)
  })
})
