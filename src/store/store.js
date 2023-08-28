import { configureStore } from '@reduxjs/toolkit';
import idSlice from './idSlice';
import ticketsSlice from './ticketsSlice';
import filtersSlice from './filterSlice';
import optionsSlice from './optionSlice';

export const store = configureStore({
    reducer: {
        id: idSlice,
        tickets: ticketsSlice,
        filter: filtersSlice,
        options: optionsSlice,
    },
});
