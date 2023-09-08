import './detail.scss';

import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetailMovie } from '~/redux/features/apiRequest';
import Layout from '~/layouts/Layout';
import { SVGClock, SVGMinus, SVGPlay, SVGPlus } from '~/assets/SVG';
import LoadEpisodes from '~/components/loadEpisodes';

function DetailMovie() {
    const dispatch = useDispatch();

    const { name } = useParams();

    // const [loading, setLoading] = React.useState(false);

    const detail = useSelector((state) => state.detail.data?.data?.data);
    const loading = useSelector((state) => state.detail.data?.loading);

    React.useEffect(() => {
        getDetailMovie(dispatch, axios, name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    const content = React.useRef(null);
    const collapse_ = React.useRef(null);

    const [collapse, setCollapse] = React.useState(false);

    React.useEffect(() => {
        if (loading === false) {
            if (collapse) {
                content.current.style.height = content.current.scrollHeight + 'px';
            }
            if (!collapse) {
                content.current.style.height = '100px';
            }
        }
    }, [collapse, loading]);

    React.useEffect(() => {
        if (loading === false) {
            if (content.current.scrollHeight < 120) {
                setCollapse(true);

                if (collapse_.current) {
                    collapse_.current.style.display = 'none';
                }
            } else {
                setCollapse(false);
                if (collapse_.current) {
                    collapse_.current.style.display = 'block';
                }
            }
        }
    }, [detail, loading]);

    return (
        <Layout>
            {loading ? (
                <div className="pt-4 w-full">
                    <div className="flex items-center flex-col md:flex-row bg-white rounded-md shadow-md p-3">
                        <div className="relative md:inline-block flex flex-col items-center">
                            <div className="animate-pulse w-60 h-80 rounded-md bg-gray-300"></div>
                        </div>

                        <div className="md:ml-8 mt-4 md:mt-0">
                            <div className="animate-pulse w-60 h-8 rounded-md bg-gray-300"></div>
                            <div className="animate-pulse w-60 h-4 rounded-md bg-gray-300 mt-2"></div>
                            <div className="animate-pulse w-60 h-4 rounded-md bg-gray-300 mt-2"></div>
                            <div className="animate-pulse w-60 h-4 rounded-md bg-gray-300 mt-2"></div>
                        </div>
                    </div>

                    <div className="mt-4 bg-white rounded-md shadow-md p-3 pb-8 flex flex-row relative">
                        <div className="w-full">
                            <div className="animate-pulse w-60 h-8 rounded-md bg-gray-300"></div>
                            <div className="animate-pulse w-full h-4 rounded-md bg-gray-300 mt-2"></div>
                            <div className="animate-pulse w-full h-4 rounded-md bg-gray-300 mt-2"></div>
                            <div className="animate-pulse w-full h-4 rounded-md bg-gray-300 mt-2"></div>
                            <div className="animate-pulse w-full h-8 rounded-md bg-gray-300 mt-4"></div>
                            <div className="animate-pulse w-full h-4 rounded-md bg-gray-300 mt-2"></div>
                        </div>
                    </div>

                    <div className="mt-4 bg-white rounded-md shadow-md p-3 flex flex-row">
                        <div className="w-full">
                            <div className="animate-pulse w-60 h-8 rounded-md bg-gray-300"></div>

                            <div className="m-auto flex flex-wrap mt-2">
                                {Array.from(Array(25).keys()).map((item, index) => (
                                    <div
                                        key={index}
                                        className="animate-pulse w-14 h-8 rounded-md bg-gray-300 mt-2 mr-2"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="pt-4 w-full">
                    <div className="flex items-center flex-col md:flex-row bg-white rounded-md shadow-md p-3">
                        <div className="relative md:inline-block flex flex-col items-center">
                            <img src={`${detail?.img}`} alt="" className="xl:w-60 md:w-48 w-60 rounded-md" />
                            <Link
                                to={`/watch/${detail?.link}`}
                                className="md:absolute md:bottom-4 md:right-1/2 transform md:translate-x-1/2"
                            >
                                <div className="whitespace-nowrap inline-block text-lg mt-5 md:mt-0 bg-teal-400 shadow-teal-00 px-2 py-1 text-white font-bold shadow-lg shadow-teal-500 hover:bg-teal-500 transition duration-300 ease-in-out hover:scale-105 transform rounded-md">
                                    <div className="flex items-center">
                                        <span>Xem phim</span>
                                        <SVGPlay className="w-5 h-5 ml-2" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="md:ml-8 mt-4 md:mt-0">
                            <h1 className="text-2xl font-bold">{detail?.title}</h1>
                            <div className="flex items-center mt-2">
                                <SVGClock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-400 ml-2">{detail?.released}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-sm whitespace-nowrap text-gray-400">Mới nhất: </span>
                                <span className="text-sm text-white ml-1 font-semibold bg-teal-500 shadow-lg shadow-teal-200 rounded-md px-2 py-1">
                                    {detail?.latest_episode}
                                </span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-sm whitespace-nowrap text-gray-400">Thể loại: </span>
                                {detail?.categoryMovie?.map((item, index) => (
                                    <Link
                                        to={`/category/${item.link}/page/1`}
                                        key={index}
                                        className="inline-block whitespace-nowrap text-sm text-white ml-1 font-semibold  bg-teal-500 rounded-md px-2 py-1"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-white rounded-md shadow-md p-3 pb-8 flex flex-row relative">
                        <div className="w-full">
                            <p className="text-xl font-bold">Nội dung</p>
                            <div
                                className={`mt-2 content text-base ${collapse ? '' : 'collapsed'}`}
                                ref={content}
                                dangerouslySetInnerHTML={{
                                    __html: detail?.contents ? detail?.contents : '<p>Nội dung đang cập nhật ...</p>',
                                }}
                            ></div>
                        </div>

                        {detail?.contents && (
                            <div
                                ref={collapse_}
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer bg-white rounded-md shadow-md p-2"
                                onClick={() => setCollapse(!collapse)}
                            >
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-400">{collapse ? 'Thu gọn' : 'Xem thêm'}</span>
                                    {collapse ? (
                                        <SVGMinus className="w-4 h-4 ml-2 transform rotate-180" />
                                    ) : (
                                        <SVGPlus className="w-4 h-4 ml-2" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 bg-white rounded-md shadow-md p-3 flex flex-row">
                        <div className="w-full">
                            <LoadEpisodes data={detail?.episodes}>
                                <p className="text-xl font-bold">Danh sách tập</p>
                            </LoadEpisodes>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default DetailMovie;
