import axios from 'axios';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadEpisodes from '~/components/loadEpisodes';
import Layout from '~/layouts/Layout';
import { getmovie } from '~/redux/features/apiRequest';
import { getMovieSuccess } from '~/redux/features/movieSlice';

function Movie() {
    const { name, episode } = useParams();

    const dispatch = useDispatch();

    const movie = useSelector((state) => state.movie.data);
    const carousel = movie?.data?.data?.carousel;

    React.useEffect(() => {
        dispatch(getMovieSuccess(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [movie.loading]);

    React.useEffect(() => {
        getmovie(dispatch, axios, name, episode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, episode]);

    return (
        <Layout>
            <div className="flex flex-col xl:flex-row mt-8 gap-4">
                <div className="flex-1 lg:flex-[3] flex flex-col">
                    {!movie.loading ? (
                        <Fragment>
                            <iframe
                                className={`block aspect-video bg-white p-4 rounded-2xl overflow-hidden ${
                                    !movie?.data?.data?.link1 && 'bg-black'
                                }`}
                                src={movie?.data?.data?.link1}
                                width="100%"
                                allowFullScreen
                                title="movie"
                            />
                        </Fragment>
                    ) : (
                        <div className="aspect-video bg-gray-800 p-4 rounded-2xl overflow-hidden animate-pulse" />
                    )}

                    <div className="flex-1 flex flex-col gap-4 mt-4 bg-white p-4 rounded-2xl overflow-hidden ">
                        <LoadEpisodes
                            className={'max-h-72'}
                            data={movie?.data?.data?.episodes}
                            currenEpisode={movie?.data?.data?.movieActive}
                            loading={movie.loading && !movie?.data?.data?.episodes}
                        >
                            <h1 className="text-lg sm:text-xl font-bold block">{movie?.data?.data?.title}</h1>
                            <div className="border-b-2 border-gray-200 my-2"></div>
                        </LoadEpisodes>
                    </div>
                </div>

                {movie.loading && !movie?.data?.data?.episodes ? (
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="bg-white p-4 rounded-2xl overflow-hidden animate-pulse">
                            <h1 className="text-lg sm:text-xl font-bold block">Xem nhiều</h1>
                            <div className="border-b-2 border-gray-200 my-2"></div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1">
                                {Array.from(Array(5).keys()).map((item, index) => (
                                    <div key={index} className="flex gap-4 mb-4">
                                        <div className="w-10 h-20 sm:h-28 sm:w-20 rounded-lg bg-gray-300"></div>
                                        <div className="flex-1">
                                            <div className="w-20 h-4 rounded-md bg-gray-300"></div>
                                            <div className="w-10 h-4 rounded-md bg-gray-300 mt-2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 w-full flex flex-col bg-white p-4 rounded-2xl">
                        <h1 className="text-lg sm:text-xl font-bold block">Xem nhiều</h1>
                        <div className="border-b-2 border-gray-200 my-2"></div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1">
                            {carousel?.map((item, index) => (
                                <Link to={`/detail/${item.link}`} key={index} className="flex gap-4 mb-4">
                                    <img src={item.img} alt="" className="w-10 sm:w-20 rounded-lg" />
                                    <div className="flex-1">
                                        <h1 className="text-sm font-bold">{item.title}</h1>
                                        <p className="text-sm">{item.episode_latest}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Movie;
