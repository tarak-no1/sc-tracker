import { configureStore } from '@reduxjs/toolkit';
import priceReducer from './priceSlice';

export const store = configureStore({
    reducer: {
        prices: priceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;