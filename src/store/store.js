import { configureStore } from '@reduxjs/toolkit';
import idSlice from './idSlice';
import ticketsSlice from './ticketsSlice';
import filtersSlice from './filterSlice';

export const store = configureStore({
    reducer: {
        id: idSlice,
        tickets: ticketsSlice,
        filter: filtersSlice,
    },
});
