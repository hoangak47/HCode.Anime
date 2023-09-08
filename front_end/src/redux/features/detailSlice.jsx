import { createSlice } from '@reduxjs/toolkit';

export const detailSlice = createSlice({
    name: 'detail',
    initialState: {
        data: {
            loading: false,
            error: false,
            data: null,
        },
    },
    reducers: {
        getDetailStart: (state) => {
            state.data.loading = true;
        },
        getDetailSuccess: (state, action) => {
            state.data.loading = false;
            state.data.data = action.payload;
        },
        getDetailFailure: (state) => {
            state.data.loading = false;
            state.data.error = true;
        },
    },
});

export const { getDetailStart, getDetailSuccess, getDetailFailure } = detailSlice.actions;

export default detailSlice.reducer;
