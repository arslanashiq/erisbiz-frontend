import { configureStore } from '@reduxjs/toolkit';
import { serviceMiddlewares, serviceReducers } from '../services';
import userSlice from './slices/userSlice';
import sideBarSlice from './slices/sideBarSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    sideBar: sideBarSlice,
    ...serviceReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serviceMiddlewares),
});

export default store;
