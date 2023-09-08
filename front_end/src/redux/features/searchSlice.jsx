import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: {
            data: null,
            loading: false,
            error: false,
        },
        searchAll: {
            data: null,
            loading: false,
            error: false,
        },
    },
    reducers: {
        getSearchStart: (state) => {
            state.search.loading = true;
        },
        getSearchSuccess: (state, action) => {
            state.search.loading = false;
            state.search.data = action.payload;
        },
        getSearchFailure: (state) => {
            state.search.loading = false;
            state.search.error = true;
        },
        getSearchAllStart: (state) => {
            state.searchAll.loading = true;
        },
        getSearchAllSuccess: (state, action) => {
            state.searchAll.loading = false;
            state.searchAll.data = action.payload;
        },
        getSearchAllFailure: (state) => {
            state.searchAll.loading = false;
            state.searchAll.error = true;
        },
    },
});

export const {
    getSearchStart,
    getSearchSuccess,
    getSearchFailure,
    getSearchAllStart,
    getSearchAllSuccess,
    getSearchAllFailure,
} = searchSlice.actions;

export default searchSlice.reducer;
