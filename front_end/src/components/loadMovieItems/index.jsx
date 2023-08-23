import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SVGStar } from '~/assets/SVG';

function LoadMovieItems({ title, data, children }) {
    return (
        <Fragment>
            <article className="mt-8 bg-white shadow-md p-8 rounded-3xl relative min-h-screen">
                {!data ? (
                    <Fragment>
                        <p className="text-2xl font-bold animate-pulse w-64 h-7 bg-gray-200"></p>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between mt-5 p-6 md:p-0">
                            {[...Array(10)].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center w-full relative overflow-hidden rounded-2xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    <div className="w-full h-72 bg-gray-200 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <span className="text-2xl font-bold">{title}</span>
                        {children}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between mt-5 p-6 md:p-0">
                            {data.map((item, index) => (
                                <Link
                                    to={`/detail/${item.link}`}
                                    key={index}
                                    className="flex flex-col items-center justify-center w-full relative overflow-hidden rounded-2xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    <img src={item.img} alt="" className="w-full object-cover h-72 " />

                                    <div className=" absolute top-2 px-2 flex items-center justify-between w-full ">
                                        <span className="border-double border-[4px] border-slate-500 bg-black p-1 px-2 text-xs text-white font-bold">
                                            {item.episode_latest}
                                        </span>
                                        <div className="flex bg-black bg-opacity-70 rounded-full p-1 px-2 items-center">
                                            <SVGStar className="w-4 h-4 text-yellow-300" />
                                            <span className="text-white text-sm font-bold ml-1">{item.rating}</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full h-8  flex items-center justify-between">
                                        <span className=" text-white text-sm text-center font-bold p-1 px-2 w-full name">
                                            {item.title}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Fragment>
                )}
            </article>
        </Fragment>
    );
}

export default LoadMovieItems;
