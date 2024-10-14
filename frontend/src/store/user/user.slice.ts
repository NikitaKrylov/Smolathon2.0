import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
	fullname: string
    email: string
    age: number
    password: string
}

const initialState: User = {
	fullname: '',
    email: '',
    age: 0,
    password: ''
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullname = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
	}
})

export const { actions, reducer } = userSlice;
