import { configureStore } from '@reduxjs/toolkit';
import { serviceMiddlewares, serviceReducers } from '../services';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    ...serviceReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serviceMiddlewares),
});

export default store;
