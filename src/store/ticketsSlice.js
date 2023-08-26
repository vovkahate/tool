import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    tickets: [],
    stop: false,
};

export const getTickets = createAsyncThunk(
    'tickets/getTickets',
    async (_, { rejectWithValue, dispatch, getState }) => {
        const id = getState().id.id;
        while (getState().tickets.stop === false) {
            try {
                const response = await axios.get(
                    `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
                );
                dispatch(setTickets(response.data));
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error) {
                console.log('error', error);
            }
        }
    }
);

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.tickets.push(...action.payload.tickets);
            state.stop = action.payload.stop;
        },
    },
});

export const { setTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
