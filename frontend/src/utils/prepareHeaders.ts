// src/utils/prepareHeaders.ts
import { RootState } from '@/store/store'; // Импортируйте тип состояния из вашего стора
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

export const prepareHeaders = (headers: Headers, state: RootState) => {
  const token = state.auth.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
