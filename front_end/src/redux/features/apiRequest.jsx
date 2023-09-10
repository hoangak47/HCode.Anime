import { getDetailFailure, getDetailStart, getDetailSuccess } from './detailSlice';
import {
    getGenreDetailFailure,
    getGenreDetailStart,
    getGenreDetailSuccess,
    getGenreFailure,
    getGenreStart,
    getGenreSuccess,
} from './genreSlice';
import { getDataFailure, getDataStart, getDataSuccess } from './homeSlice';
import { getMovieStart, getMovieSuccess } from './movieSlice';
import {
    getSearchAllFailure,
    getSearchAllStart,
    getSearchAllSuccess,
    getSearchFailure,
    getSearchStart,
    getSearchSuccess,
} from './searchSlice';
import { getSeeAllMovieFailure, getSeeAllMovieStart, getSeeAllMovieSuccess } from './seeAllMovieSlice';

const api = 'https://hcode-anime-api.onrender.com';

export const getHomeData = async (dispatch, axios) => {
    try {
        dispatch(getDataStart());
        const response = await axios.get(`${api}/api/home`);
        dispatch(getDataSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getDataFailure());
    }
};

export const getDetailMovie = async (dispatch, axios, link) => {
    try {
        dispatch(getDetailStart());
        const response = await axios.get(`${api}/api/detail/${link}`);
        dispatch(getDetailSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getDetailFailure());
    }
};

export const getGenre = async (dispatch, axios) => {
    try {
        dispatch(getGenreStart());
        const response = await axios.get(`${api}/api/category`);
        dispatch(getGenreSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getGenreFailure());
    }
};

export const getGenreDetail = async (dispatch, axios, name, page) => {
    try {
        dispatch(getGenreDetailStart());
        const response = await axios.get(`${api}/api/category/${name}/page/${page}`);
        dispatch(getGenreDetailSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getGenreDetailFailure());
    }
};

export const getSeeAllMovie = async (dispatch, axios, page) => {
    try {
        dispatch(getSeeAllMovieStart());
        const response = await axios.get(`${api}/api/latest-movie/page/${page}`);
        dispatch(getSeeAllMovieSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getSeeAllMovieFailure());
    }
};

export const getSearchMovie = async (dispatch, axios, search) => {
    try {
        dispatch(getSearchStart());
        const response = await axios.get(`${api}/api/search?name=${search}`);
        dispatch(getSearchSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getSearchFailure());
    }
};

export const getSearchAllMovie = async (dispatch, axios, search, page = 1) => {
    try {
        dispatch(getSearchAllStart());
        const response = await axios.get(`${api}/api/search/all?name=${search}&page=${page}`);
        dispatch(getSearchAllSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getSearchAllFailure());
    }
};

export const getmovie = async (dispatch, axios, name, episode) => {
    try {
        dispatch(getMovieStart());
        const response = await axios.get(`${api}/api/movie/${name}/${episode}`);
        dispatch(getMovieSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getDetailFailure());
    }
};
