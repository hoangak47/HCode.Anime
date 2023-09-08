import './index.scss';

import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetailSuccess } from '~/redux/features/detailSlice';

function LoadMovieItems({ title, data, loading, seeAll, children, pageInBottom }) {
    const dispatch = useDispatch();

    return (
        <Fragment>
            <article className="mt-8 bg-white shadow-md p-2 md:p-8 rounded-3xl relative ">
                {!data || loading ? (
                    <Fragment>
                        <p className="text-2xl font-bold animate-pulse w-64 h-7 bg-gray-300"></p>
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between mt-5 p-6 md:p-0">
                            {[...Array(10)].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center w-full relative overflow-hidden rounded-2xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    <div className="w-full h-72 bg-gray-300 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <span className="text-2xl font-bold ml-3">{title}</span>
                        {children}
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between mt-5 p-0">
                            {data.map((item, index) => (
                                <Link
                                    title={item.title}
                                    to={`/detail/${item.link}`}
                                    onClick={() => {
                                        dispatch(getDetailSuccess(null));
                                    }}
                                    key={index}
                                    className={`flex flex-col items-center justify-center opacity-0 w-full relative overflow-hidden rounded-2xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer movie-item`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="w-full object-cover h-72 hover:scale-105 transition duration-300 ease-in-out"
                                    />

                                    <div className=" absolute top-2 px-2 flex items-center justify-between w-full ">
                                        <span className="border-double border-[4px] border-slate-500 bg-black p-1 px-2 text-xs text-white font-bold">
                                            {item.episode_latest}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full h-8  flex items-center justify-between">
                                        <span className=" text-white text-sm text-center font-bold p-1 px-2 w-full name name-1">
                                            {item.title}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {data.length === 0 && (
                            <div className="flex justify-center items-center mt-5">
                                <span className="text-2xl font-bold">Không có dữ liệu</span>
                            </div>
                        )}

                        {seeAll && (
                            <div className="flex md:justify-end justify-center mt-5">
                                <Link
                                    to={seeAll}
                                    className="w-1/2 md:w-1/3 2xl:w-56 bg-gradient-to-tr from-teal-400 to-blue-500 text-white px-5 py-1 rounded-md hover:shadow-lg shadow-md transition duration-300 ease-in-out text-sm md:text-end text-center "
                                >
                                    Xem tất cả
                                </Link>
                            </div>
                        )}

                        {pageInBottom}
                    </Fragment>
                )}
            </article>
        </Fragment>
    );
}

export default LoadMovieItems;
