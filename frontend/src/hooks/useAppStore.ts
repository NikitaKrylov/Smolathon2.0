import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'

// Пользовательский хук для useDispatch с типизацией
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Пользовательский хук для useSelector с типизацией
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
