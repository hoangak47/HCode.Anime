/* eslint-disable jsx-a11y/iframe-has-title */

import './home.scss';

import React from 'react';
import { getHomeData } from '~/redux/features/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadMovieItems from '~/components/loadMovieItems';
import Slide from '~/layouts/Slide';
import Layout from '~/layouts/Layout';
import { Helmet } from 'react-helmet';

function Home() {
    const dispatch = useDispatch();

    const dataHome = useSelector((state) => state.home.data.data);
    console.log(dataHome);
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const today = new Date().getDay();

    const [currentDay, setCurrentDay] = React.useState();
    React.useEffect(() => {
        getHomeData(dispatch, axios);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (today - 1 < 0) {
            setCurrentDay(6);
        } else {
            setCurrentDay(today - 1);
        }
    }, [dataHome, today]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>HCode.Anime</title>
                <meta name="description" content="Home" />
            </Helmet>
            <Layout dispatch={dispatch}>
                <Slide data={dataHome?.data?.carousel} current={currentSlide} setCurrent={setCurrentSlide} />

                <LoadMovieItems
                    seeAll={dataHome?.data?.latest_Episodes?.link_see_all}
                    title={dataHome?.data?.latest_Episodes.title}
                    data={dataHome?.data?.latest_Episodes?.data}
                >
                    <img
                        src="https://i.imgur.com/sJc3X3b.png"
                        alt=""
                        className="absolute -top-8 -left-8 w-20 md:block hidden"
                    />
                    <img
                        src="https://i.imgur.com/QUvcecr.png"
                        alt=""
                        className="absolute -top-16 right-6 w-40 md:block hidden"
                    />
                </LoadMovieItems>

                <LoadMovieItems
                    title={dataHome?.data?.schedule.title}
                    data={dataHome?.data?.schedule?.data[currentDay]}
                >
                    <div className="text-lg mt-3">
                        {dataHome?.data?.schedule?.day?.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentDay(index)}
                                className={`inline-block px-3 cursor-pointer transition-all duration-300 ease-in-out ml-1 mb-2
                ${
                    currentDay === index
                        ? 'bg-teal-400 shadow-teal-00 text-white shadow-lg shadow-teal-500 rounded-md '
                        : 'hover:bg-teal-400  hover:text-white hover:shadow-lg hover:shadow-teal-500 hover:rounded-md '
                }`}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </LoadMovieItems>
            </Layout>
        </>
    );
}

export default Home;
