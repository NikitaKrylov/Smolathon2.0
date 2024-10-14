import { api } from './api.ts'

export interface CardType {
	creator: string
	title: string
	created_at?: string
	updated_at?: string
	img: string
	badges?: string[]
	description?: string
}



export const cardsApi = api.injectEndpoints({
	endpoints: builder => ({
		getCards: builder.query<CardType[], void>({
			query: () => ({
				url: '/posts'
			}),
			providesTags: ['Cards']
		}),
		
	})
})

export const {
	useGetCardsQuery
} = cardsApi
