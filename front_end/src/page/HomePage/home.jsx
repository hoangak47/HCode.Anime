/* eslint-disable jsx-a11y/iframe-has-title */

import './home.scss';

import React from 'react';
import { getHomeData } from '~/redux/features/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadMovieItems from '~/components/loadMovieItems';
import Slide from '~/layouts/Slide';
import Layout from '~/layouts/Layout';

function Home() {
    const dispatch = useDispatch();

    const dataHome = useSelector((state) => state.home.data.data);
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
        <Layout dispatch={dispatch}>
            <Slide data={dataHome?.data?.carousel} current={currentSlide} setCurrent={setCurrentSlide} />

            <LoadMovieItems
                seeAll={dataHome?.data?.latest_Episodes?.link_see_all}
                title={dataHome?.data?.latest_Episodes.title}
                data={dataHome?.data?.latest_Episodes?.data}
            >
                <img
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/61c717ae-3d90-4186-bbef-9a7191eb6146/ddmainq-d4eb464c-826f-45e2-aed3-65b216ec12c8.png/v1/fill/w_891,h_720,strp/zenitsu_agatsuma_render___kimersu_no_yaiba_by_guntersw_ddmainq-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNjFjNzE3YWUtM2Q5MC00MTg2LWJiZWYtOWE3MTkxZWI2MTQ2XC9kZG1haW5xLWQ0ZWI0NjRjLTgyNmYtNDVlMi1hZWQzLTY1YjIxNmVjMTJjOC5wbmciLCJ3aWR0aCI6Ijw9ODkxIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.zDQ6eyN_1iGepS-buOb9y83KvMdxEPMk6HCCjl2AyQY"
                    alt=""
                    className="absolute -top-8 -left-8 w-20 md:block hidden"
                />
                <img
                    src="https://i.imgur.com/QUvcecr.png"
                    alt=""
                    className="absolute -top-16 right-6 w-40 md:block hidden"
                />
            </LoadMovieItems>

            <LoadMovieItems title={dataHome?.data?.schedule.title} data={dataHome?.data?.schedule?.data[currentDay]}>
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
    );
}

export default Home;
