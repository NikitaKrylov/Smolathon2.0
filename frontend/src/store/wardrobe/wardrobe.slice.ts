import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WardRobe {
	wardRobe: boolean
	item?: string
	items: string[]
}

const initialState: WardRobe = {
	wardRobe: false,
	item: '',
	items: []
}

const wardRobeSlice = createSlice({
	name: 'wardRobe',
	initialState,
	reducers: {
		changeStateWardrobe: state => {
			state.wardRobe = !state.wardRobe
		},
		setDressItem: (state, action: PayloadAction<string>) => {
			state.item = action.payload
		},
		setItems: (state, action: PayloadAction<string[]>) => {
			state.items = action.payload
		}
	}
})

export const { actions, reducer } = wardRobeSlice
