import { createSlice } from '@reduxjs/toolkit';

export const seeAllMovieSlice = createSlice({
    name: 'seeAllMovie',
    initialState: {
        data: {
            loading: false,
            error: false,
            data: null,
        },
    },

    reducers: {
        getSeeAllMovieStart: (state) => {
            state.data.loading = true;
            state.data.error = false;
        },
        getSeeAllMovieSuccess: (state, action) => {
            state.data.loading = false;
            state.data.error = false;
            state.data.data = action.payload;
        },
        getSeeAllMovieFailure: (state) => {
            state.data.loading = false;
            state.data.error = true;
        },
    },
});

export const { getSeeAllMovieStart, getSeeAllMovieSuccess, getSeeAllMovieFailure } = seeAllMovieSlice.actions;

export default seeAllMovieSlice.reducer;
