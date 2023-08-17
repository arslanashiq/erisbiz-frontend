import { privateApi } from './private';
import { publicApi } from './public';
import { thirdPartyApi } from './third-party';

export const serviceReducers = {
  [privateApi.reducerPath]: privateApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  [thirdPartyApi.reducerPath]: thirdPartyApi.reducer,
};

export const serviceMiddlewares = [privateApi.middleware, publicApi.middleware, thirdPartyApi.middleware];
