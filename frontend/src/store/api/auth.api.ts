import { api } from './api.ts';
import { store } from '../store.ts';
import { actions } from '@/store/auth/auth.slice.ts';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: '/users/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: body.username,
          password: body.password,
        }),
      }),
      transformResponse: (response: { access_token: string, detail?: string}) => {
        if (response.access_token) {
          store.dispatch(actions.setToken(response.access_token));
        }
        return response;
      },
    }),
  }),
});

export const { useAuthMutation } = authApi;
