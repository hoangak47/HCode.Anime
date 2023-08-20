import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        data: {
            loading: false,
            error: false,
            data: null,
        },
    },
    reducers: {
        getDataStart: (state) => {
            state.data.loading = true;
        },
        getDataSuccess: (state, action) => {
            state.data.loading = false;
            state.data.data = action.payload;
        },
        getDataFailure: (state) => {
            state.data.loading = false;
            state.data.error = true;
        },
    },
});

export const { getDataStart, getDataSuccess, getDataFailure } = homeSlice.actions;

export default homeSlice.reducer;
