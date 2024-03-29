import { createSlice } from '@reduxjs/toolkit'
import { fetchRegistration } from './user.actions'

const initialState = {
	profileFromActivation: {
		email: '',
		password: '',
		repeat_password: '',
	},
	profile: {
		username: '',
		email: '',
		id: 0,
	},
	isError: null,
	isLoaded: false,
	success: false,
}

const userRegistration = createSlice({
	name: 'userRegistration',
	initialState,
	reducers: {
		getDataFromActivation: (state, action) => {
			console.log(action.payload)
			state.profileFromActivation = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRegistration.pending, (state) => {
				state.isLoaded = true
				state.isError = null
			})
			.addCase(fetchRegistration.fulfilled, (state, action) => {
				// console.log("Данные которые пришли, после регистрации", action.payload);
				state.isLoaded = false
				state.profile = action.payload
				state.success = true
			})
			.addCase(fetchRegistration.rejected, (state, action) => {
				console.log('ошибка из слайса регистарции', action.payload)
				state.success = false
				state.isLoaded = false
				// @ts-ignore
				state.isError = action.payload
			})
	},
})

export const { getDataFromActivation } = userRegistration.actions
export default userRegistration.reducer
