import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    id: '',
    isLoading: false,
    error: '',
};

export const getId = createAsyncThunk(
    'id/getSearchId',
    async (_, { rejectWithValue, dispatch }) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(
                'https://aviasales-test-api.kata.academy/search'
            );
            dispatch(setSearchId(response.data));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
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
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getId.fulfilled, (state) => {
                console.log('fulfilled id');
            })
            .addCase(getId.rejected, () => {
                console.log('rejected id');
            })
            .addCase(getId.pending, () => {
                console.log('pending id');
            });
    },
});

export const { setSearchId, setLoading, setError } = idSlice.actions;
export default idSlice.reducer;
