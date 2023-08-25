import { configureStore } from '@reduxjs/toolkit';
import idSlice from './idSlice';
import ticketsSlice from './ticketsSlice';

export const store = configureStore({
    reducer: {
        id: idSlice,
        tickets: ticketsSlice,
    },
});
