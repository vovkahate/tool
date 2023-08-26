import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    id: '',
    isLoading: true,
    error: '',
};

export const getId = createAsyncThunk(
    'id/getSearchId',
    async (_, { rejectWithValue, dispatch }) => {
        const response = await axios.get(
            'https://aviasales-test-api.kata.academy/search'
        );
        dispatch(setSearchId(response.data));
    }
);

export const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        setSearchId: (state, action) => {
            state.id = action.payload.searchId;
            console.log('id:', state.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getId.fulfilled, (state) => {
                console.log('fulfilled id');
                state.isLoading = false;
            })
            .addCase(getId.rejected, (state, action) => {
                console.log('rejected id');
                state.error = action.payload;
            })
            .addCase(getId.pending, (state, action) => {
                console.log('pending id');
                state.isLoading = true;
            });
    },
});

export const { setSearchId, setLoading, setError } = idSlice.actions;
export default idSlice.reducer;
