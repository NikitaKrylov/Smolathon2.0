import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { prepareHeaders } from '../../utils/prepareHeaders';
import { RootState } from '@/store/store';
const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
	prepareHeaders: (headers, { getState }) => prepareHeaders(headers, getState() as RootState),
});


export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Cards', 'User'],
	baseQuery: baseQuery,
	endpoints: () => ({})
})
