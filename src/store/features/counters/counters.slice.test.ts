import { countersSlice, setMyRecipiesCount, setMySubscriptionsCount, setMySubscribersCount } from './counters.slice'

describe('countersSlice', () => {
  it('should return the initial state', () => {
    expect(countersSlice.reducer(undefined, { type: '' })).toEqual({
      profileTabMyRecipies: 0,
      profileTabMySubscriptions: 0,
      profileTabMySubscribers: 0,
    })
  })

  it('should handle setMyRecipiesCount', () => {
    const previousState = { profileTabMyRecipies: 0 }
    expect(countersSlice.reducer(previousState, setMyRecipiesCount(5))).toEqual({
      profileTabMyRecipies: 5,
    })
  })

  it('should handle setMySubscriptionsCount', () => {
    const previousState = { profileTabMySubscriptions: 0 }
    expect(countersSlice.reducer(previousState, setMySubscriptionsCount(3))).toEqual({
      profileTabMySubscriptions: 3,
    })
  })

  it('should handle setMySubscribersCount', () => {
    const previousState = { profileTabMySubscribers: 0 }
    expect(countersSlice.reducer(previousState, setMySubscribersCount(10))).toEqual({
      profileTabMySubscribers: 10,
    })
  })
}) 