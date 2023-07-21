import { privateApi } from './private';
import { publicApi } from './public';

export const serviceReducers = {
  [privateApi.reducerPath]: privateApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
};

export const serviceMiddlewares = [privateApi.middleware, publicApi.middleware];
