import { Routes, Route } from 'react-router-dom';
import Home from './page/HomePage/home';
import DetailMovie from './page/DetailMovie/detail';
import SeeAllLastMovie from './page/SeeAllLastMovie/seeAllLastMovie';
import Category from './page/Category/category';
import Search from './page/Search/search';
import Movie from './page/Movie/movie';

import React from 'react';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:name" element={<DetailMovie />} />
            <Route path="/latest-movie/page/:page" element={<SeeAllLastMovie />} />
            <Route path="/category/:name/page/:page" element={<Category />} />
            <Route path="/search/:name/page/:page" element={<Search />} />
            <Route path="/search/:name" element={<Search />} />
            <Route path="/watch/:name/:episode" element={<Movie />} />
        </Routes>
    );
}

export default App;
