import { createSlice } from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'genre',
    initialState: {
        category: {
            loading: false,
            error: false,
            data: null,
        },
        category_detail: {
            loading: false,
            error: false,
            data: null,
        },
    },
    reducers: {
        getGenreStart: (state) => {
            state.category.loading = true;
        },
        getGenreSuccess: (state, action) => {
            state.category.loading = false;
            state.category.data = action.payload;
        },
        getGenreFailure: (state) => {
            state.category.loading = false;
            state.category.error = true;
        },

        getGenreDetailStart: (state) => {
            state.category_detail.loading = true;
        },
        getGenreDetailSuccess: (state, action) => {
            state.category_detail.loading = false;
            state.category_detail.data = action.payload;
        },
        getGenreDetailFailure: (state) => {
            state.category_detail.loading = false;
            state.category_detail.error = true;
        },
    },
});

export const {
    getGenreStart,
    getGenreSuccess,
    getGenreFailure,
    getGenreDetailStart,
    getGenreDetailSuccess,
    getGenreDetailFailure,
} = genreSlice.actions;

export default genreSlice.reducer;
