import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './slices/ingredients';
import userReducer from './slices/user';
import constructorReducer from './slices/burger-constructor';
import orderReducer from './slices/order';
import feedReducer from './slices/feed';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  constructorItems: constructorReducer,
  order: orderReducer,
  feed: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
