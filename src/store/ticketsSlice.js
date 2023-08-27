import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    all: [],
    0: [],
    1: [],
    2: [],
    3: [],
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
                const filteredObject = response.data.tickets;
                //const filteredStop = response.data.stop;
                const data = {
                    all: filteredObject,
                    0: filteredObject.filter((ticket) =>
                        ticket.segments.some(
                            (segment) => segment.stops.length === 0
                        )
                    ),
                    1: filteredObject.filter((ticket) =>
                        ticket.segments.some(
                            (segment) => segment.stops.length === 1
                        )
                    ),
                    2: filteredObject.filter((ticket) =>
                        ticket.segments.some(
                            (segment) => segment.stops.length === 2
                        )
                    ),
                    3: filteredObject.filter((ticket) =>
                        ticket.segments.some(
                            (segment) => segment.stops.length === 3
                        )
                    ),
                    stop: response.data.stop,
                };

                dispatch(setTickets(data));
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error) {
                //console.log('error', error);
            }
        }
    }
);

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.all = [...state.all, ...action.payload.all];
            state.stop = action.payload.stop;
            state[0] = [...state[0], ...action.payload[0]];
            state[1] = [...state[1], ...action.payload[1]];
            state[2] = [...state[2], ...action.payload[2]];
            state[3] = [...state[3], ...action.payload[3]];
        },
    },
});

export const { setTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
