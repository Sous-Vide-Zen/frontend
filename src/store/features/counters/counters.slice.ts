import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IInitialState {
  profileTabMyRecipies: number
  profileTabMySubscriptions: number
  profileTabMySubscribers: number
}

const defaultState: IInitialState = {
  profileTabMyRecipies: 0,
  profileTabMySubscriptions: 0,
  profileTabMySubscribers: 0,
}

export const countersSlice = createSlice({
  name: 'counters',
  initialState: defaultState,
  reducers: {
    setMyRecipiesCount: (state, action: PayloadAction<number | undefined>) => {
      state.profileTabMyRecipies = action.payload ?? 0
    },
    setMySubscriptionsCount: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.profileTabMySubscriptions = action.payload ?? 0
    },
    setMySubscribersCount: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.profileTabMySubscribers = action.payload ?? 0
    },
  },
})

export const {
  setMyRecipiesCount,
  setMySubscribersCount,
  setMySubscriptionsCount,
} = countersSlice.actions

export default countersSlice.reducer
