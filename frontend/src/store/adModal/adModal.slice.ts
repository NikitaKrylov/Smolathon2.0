import { createSlice } from '@reduxjs/toolkit'

interface initialState {
	isOpen: boolean
}

const initialState: initialState = {
	isOpen: false
}

export const adModalSlice = createSlice({
	name: 'adModal',
	initialState: initialState,
	reducers: {
		openAdModal: state => {
			state.isOpen = true
		},
		closeAdModal: state => {
			state.isOpen = false
		}
	}
})

export const { actions, reducer } = adModalSlice
