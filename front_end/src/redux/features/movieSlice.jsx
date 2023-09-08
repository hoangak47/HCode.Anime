import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        data: {
            loading: false,
            error: false,
            data: null,
        },
    },

    reducers: {
        getMovieStart: (state) => {
            state.data.loading = true;
            state.data.error = false;
        },
        getMovieSuccess: (state, action) => {
            state.data.loading = false;
            state.data.error = false;
            state.data.data = action.payload;
        },
        getMovieFailure: (state) => {
            state.data.loading = false;
            state.data.error = true;
        },
    },
});

export const { getMovieStart, getMovieSuccess, getMovieFailure } = movieSlice.actions;

export default movieSlice.reducer;
