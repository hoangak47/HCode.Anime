import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SVGArrowLeft, SVGPlay } from '~/assets/SVG';
import { getDetailSuccess } from '~/redux/features/detailSlice';

function Slide({ data, current, setCurrent }) {
    const dispatch = useDispatch();

    React.useEffect(() => {}, [data, current]);

    return (
        <article
            className={`mt-5 flex h-80 w-full flex-row items-end justify-between md:rounded-3xl bg-contain bg-repeat-x bg-center
            transition-all duration-500 ease-in-out md:h-72 lg:h-80 ${!data && `bg-gray-300 animate-pulse  `}`}
            style={{
                boxShadow: `${data && `black 0px 0px 13em 3em inset`}`,
                backgroundImage: `${data && `url(${data[current]?.img})`}`,
            }}
            title={data && data[current]?.title}
        >
            {data && (
                <Fragment>
                    <div className="flex flex-col items-start ml-4 mb-3 md:ml-16 md:mb-10">
                        <span className="text-lg lg:text-4xl font-bold text-white max-w-sm">
                            {data[current]?.title}
                        </span>
                        <Link
                            to={`/detail/${data[current]?.link}`}
                            onClick={() => {
                                dispatch(getDetailSuccess(null));
                            }}
                            className="flex items-center text-xs sm:text-lg  mt-5 bg-teal-400  rounded-full px-5 py-2 text-white font-bold shadow-lg shadow-teal-500 hover:bg-teal-500 transition duration-300 ease-in-out hover:scale-105 transform"
                        >
                            Watch now
                            <SVGPlay className="w-5 h-5 ml-2" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-around p-5 xl:backdrop-blur-xl xl:backdrop-brightness-150 xl:bg-white/30 mb-10 mr-0 rounded-s-3xl">
                        <img
                            src={current + 1 > data?.length - 1 ? data[0]?.img : data[current + 1]?.img}
                            alt=""
                            className="aspect-[16/9] w-32 animate-pulse rounded-2xl object-cover hover:scale-105 transition duration-300 ease-in-out hidden xl:block"
                        />
                        <img
                            src={
                                current + 2 > data?.length
                                    ? data[1]?.img
                                    : current + 2 > data?.length - 1
                                    ? data[0]?.img
                                    : data[current + 2]?.img
                            }
                            alt=""
                            className="aspect-[16/9] w-32 mx-7 rounded-2xl object-cover hover:scale-105 transition duration-300 ease-in-out hidden xl:block"
                        />

                        <div
                            onClick={() => {
                                if (current > 0) {
                                    setCurrent(current - 1);
                                } else {
                                    setCurrent(data?.length - 1);
                                }
                            }}
                            className="flex items-center p-2 rounded-full bg-white cursor-pointer hover:bg-[#E0E7FF] transform transition duration-200 ease-in-out mr-3 xl:hidden"
                        >
                            <SVGArrowLeft className="w-5 h-5 transform rotate-180" />
                        </div>
                        <div
                            onClick={() => {
                                if (current < data?.length - 1) {
                                    setCurrent(current + 1);
                                } else {
                                    setCurrent(0);
                                }
                            }}
                            className="flex items-center p-2 rounded-full bg-white cursor-pointer hover:bg-[#E0E7FF] transform transition duration-200 ease-in-out"
                        >
                            <SVGArrowLeft className="w-5 h-5" />
                        </div>
                    </div>
                </Fragment>
            )}
        </article>
    );
}

export default Slide;
