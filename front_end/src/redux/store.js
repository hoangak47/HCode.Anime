import { configureStore } from '@reduxjs/toolkit';

import homeReducer from './features/homeSlice';
import detailReducer from './features/detailSlice';
import genreReducer from './features/genreSlice';
import seeAllReducer from './features/seeAllMovieSlice';
import searchReducer from './features/searchSlice';
import movieReducer from './features/movieSlice';

export default configureStore({
    reducer: {
        home: homeReducer,
        detail: detailReducer,
        genre: genreReducer,
        seeAll: seeAllReducer,
        search: searchReducer,
        movie: movieReducer,
    },
});
