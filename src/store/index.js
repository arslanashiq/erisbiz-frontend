import { configureStore } from '@reduxjs/toolkit';
import { serviceMiddlewares, serviceReducers } from '../services';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    ...serviceReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serviceMiddlewares),
});

export default store;
