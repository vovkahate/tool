import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    tickets: [],
};

export const getTickets = createAsyncThunk(
    'tickets/getTickets',
    async (_, { rejectWithValue, dispatch, getState }) => {
        const id = getState().id.id;
        const response = await axios.get(
            `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
        );
        dispatch(setTickets(response.data));
    }
);

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.tickets = action.payload;
        },
    },
});

export const { setTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
