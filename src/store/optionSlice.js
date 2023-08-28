import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cheapest: true,
    fastest: false,
};

export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setCheapest: (state, action) => {
            state.cheapest = action.payload;
        },
        setFastest: (state, action) => {
            state.fastest = action.payload;
        },
    },
});

export const { setCheapest, setFastest } = optionsSlice.actions;
export default optionsSlice.reducer;
