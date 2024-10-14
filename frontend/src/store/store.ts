import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { reducer as authReducer } from './auth/auth.slice.ts'
// import { reducer as musicReducer } from '@/store/music/music.slice.ts'

// import { reducer as wardRobeReducer } from './wardrobe/wardrobe.slice.ts'
import {reducer as userReducer} from './user/user.slice.ts'
import { api } from './api/api.ts'

const reducers = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authReducer,
	// wardRobe: wardRobeReducer
	user: userReducer
})

export const store = configureStore({
	reducer: reducers,
	devTools: true,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})
export type RootState = ReturnType<typeof store.getState>;  // Правильное определение типа состояния
export type AppDispatch = typeof store.dispatch;
