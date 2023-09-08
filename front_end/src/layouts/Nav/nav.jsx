import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SVGGenre, SVGPopular, SvGHome } from '~/assets/SVG';
import Logo from '~/assets/images/Logo.png';
import { getGenre } from '~/redux/features/apiRequest';

function Nav() {
    const dispatch = useDispatch();

    const genre = useSelector((state) => state.genre?.category);

    React.useEffect(() => {
        if (!genre?.data) getGenre(dispatch, axios);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="fixed invisible md:visible md:w-48 lg:w-64 p-8 flex justify-center bg-white shadow-md rounded-3xl nav z-10">
            <div className="flex flex-col items-center  ">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="w-96 " />
                </Link>
                <div className="flex flex-col w-full ">
                    <div className="flex flex-col text-lg mt-6">
                        <Link
                            to={`/`}
                            className="flex flex-row items-center p-2 rounded-xl hover:-translate-y-2 hover:text-white hover:bg-[#818CF8] transform transition duration-300 ease-in-out cursor-pointer"
                        >
                            <SvGHome className="w-5 h-5 " />
                            <div className="ml-4">Home</div>
                        </Link>
                        <div className="flex flex-row items-center p-2  rounded-xl hover:-translate-y-2 hover:bg-[#E0E7FF] transform transition duration-300 ease-in-out cursor-pointer">
                            <SVGPopular className="w-5 h-5 " />
                            <div className="ml-4">Popular</div>
                            <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-teal-400 opacity-75 ml-3"></span>
                        </div>
                        <div className="flex flex-row items-center p-2 rounded-xl hover:-translate-y-2 hover:bg-[#E0E7FF] transform transition duration-300 ease-in-out cursor-pointer relative genre">
                            <SVGGenre className="w-5 h-5 " />
                            <div className="ml-4">Genre</div>

                            <div className="absolute left-full ml-4 bg-white shadow-md rounded-xl grid grid-cols-2 gap-2 p-2 w-80 group-hover:opacity-100 transition duration-300 ease-in-out z-10 opacity-0 invisible child ">
                                {genre?.data?.category.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/category/${item.link}/page/1`}
                                        className="flex flex-row items-center p-2 rounded-xl hover:bg-[#E0E7FF] hover:text-gray-600 transform transition duration-300 ease-in-out cursor-pointer"
                                    >
                                        <div className="ml-4 ">{item.name}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-8 w-full">
                    <span className="text-xl font-bold text-[#B5BAC3] mb-2">TOP VIEW</span>
                    <div className="flex flex-col text-lg">
                        <Link className="flex flex-row mt-5 w-full" to={`/detail/dau-pha-thuong-khung-phan-5`}>
                            <img
                                src="https://hhhkungfu.tv/wp-content/uploads/Dau-Pha-Thuong-Khung-5-320x449.jpg"
                                alt=""
                                className="w-9"
                            />
                            <div className="flex items-center justify-center p-2 h-14 w-[calc(100%-2.25rem)] rounded-e-lg bg-gradient-to-r from-teal-500 to-indigo-400 text-white">
                                <span className="text-sm text-center name">Đấu Phá Thương Khung Phần 5</span>
                            </div>
                        </Link>
                        <Link
                            className="flex flex-row mt-5"
                            to={`/detail/the-gioi-hoan-my`}
                            state={{ link: 'the-gioi-hoan-my' }}
                        >
                            <img
                                src="https://hhhkungfu.tv/wp-content/uploads/2022/01/The-Gioi-Hoan-My-320x449.jpg"
                                alt=""
                                className="w-9"
                            />
                            <div className="flex items-center justify-center p-2 h-14 w-[calc(100%-2.25rem)] rounded-e-lg bg-teal-500 text-white">
                                <span className="text-sm text-center name">Thế Giới Hoàn Mỹ</span>
                            </div>
                        </Link>
                        <Link
                            className="flex flex-row mt-5"
                            to={`/detail/thuong-nguyen-do`}
                            state={{ link: 'thuong-nguyen-do' }}
                        >
                            <img
                                src="https://hhhkungfu.tv/wp-content/uploads/Thuong-Nguyen-Do-300x449.jpg"
                                alt=""
                                className="w-9"
                            />
                            <div className="flex items-center justify-center p-2 h-14 w-[calc(100%-2.25rem)] rounded-e-lg bg-teal-500 text-white">
                                <span className="text-sm text-center name">Thương Nguyên Đồ</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <span className="w-full text-xs absolute bottom-5 text-center text-[#B5BAC3]">
                    HCode.Anime Copyright © 2023
                </span>
            </div>
        </div>
    );
}

export default Nav;
