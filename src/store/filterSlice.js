import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    all: false,
    without: false,
    one: false,
    two: false,
    three: false,
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setAll: (state, action) => {
            state.all = action.payload;
        },
        setWithout: (state, action) => {
            state.without = action.payload;
        },
        setOne: (state, action) => {
            state.one = action.payload;
        },
        setTwo: (state, action) => {
            state.two = action.payload;
        },
        setThree: (state, action) => {
            state.three = action.payload;
        },
    },
});

export const { setAll, setWithout, setOne, setTwo, setThree } =
    filterSlice.actions;
export default filterSlice.reducer;
