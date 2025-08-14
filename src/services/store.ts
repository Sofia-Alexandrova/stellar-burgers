    import { configureStore } from '@reduxjs/toolkit';
    import {
      TypedUseSelectorHook,
      useDispatch as dispatchHook,
      useSelector as selectorHook
    } from 'react-redux';
    import ingredientsReducer from './slices/ingredients';
    import userReducer from './slices/user'; 

    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer,
        user: userReducer, 
      },
      devTools: process.env.NODE_ENV !== 'production'
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;

    export const useDispatch: () => AppDispatch = () => dispatchHook();
    export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

    export default store;
    
