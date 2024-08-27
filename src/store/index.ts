import {configureStore} from '@reduxjs/toolkit';
import auth from '../reducers/auth';
import product from '../reducers/product';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

const store = configureStore({
  reducer: {
    auth,
    product,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define a typed useAppDispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch<AppDispatch>;

// Define a typed useAppSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
