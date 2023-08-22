/* eslint-disable jsx-a11y/iframe-has-title */
import { SVGArrowLeft, SVGGenre, SVGPlay, SVGPopular, SVGSearch, SVGStar, SvGHome } from '~/assets/SVG';
import './home.scss';

import Logo from '~/assets/images/Logo.png';
import React from 'react';
import { getHomeData } from '~/redux/features/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadMovieItems from '~/components/loadMovieItems';
import Slide from '~/layouts/Slide';

function Home() {
    const dispatch = useDispatch();

    const dataHome = useSelector((state) => state.home.data.data);
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        getHomeData(dispatch, axios);
    }, []);

    return (
        <div className=" mx-auto px-8">
            {/* <video autoPlay muted controls loop id="myVideo" className=" z-[-1] w-full h-full object-cover">
                <source
                    src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.25447-2/10000000_1496642391110901_3401965019783273408_n.mp4?_nc_cat=106&vs=6c79b9a1fc6bb15a&_nc_vs=HBksFQAYJEdJQ1dtQUQxOUJNMk1GRUZBTUNiZkQ0cE5UWXZibWRqQUFBRhUAAsgBABUAGCRHQ2ZmQlJiVnJYdG56UVVXQU9PU2VtNWF0SHdrYnY0R0FBQUYVAgLIAQBLB4gScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AHXVzZV9sYW5jem9zX2Zvcl92cW1fdXBzY2FsaW5nABFkaXNhYmxlX3Bvc3RfcHZxcwAVACUAHIwXQAAAAAAAAAAREQAAACbO6bGx65LBAxUCKANDM2UYC3Z0c19wcmV2aWV3HBdAkxWZmZmZmhghZGFzaF9nZW4yaHdiYXNpY19ocTJfZnJhZ18yX3ZpZGVvEgAYGHZpZGVvcy52dHMuY2FsbGJhY2sucHJvZDgSVklERU9fVklFV19SRVFVRVNUGwqIFW9lbV90YXJnZXRfZW5jb2RlX3RhZwZvZXBfaGQTb2VtX3JlcXVlc3RfdGltZV9tcwEwDG9lbV9jZmdfcnVsZQd1bm11dGVkE29lbV9yb2lfcmVhY2hfY291bnQBMBFvZW1faXNfZXhwZXJpbWVudAAMb2VtX3ZpZGVvX2lkDzE3MTM1MDA1OTI0ODE4NRJvZW1fdmlkZW9fYXNzZXRfaWQPMjA4Mzk4MTE4NjEyMDQ0FW9lbV92aWRlb19yZXNvdXJjZV9pZA85ODc2ODUwOTI0NzM0NDccb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZA84MzkyOTY0MjQzODI4MTUOdnRzX3JlcXVlc3RfaWQAJQIcACXEARsHiAFzBDgzMjUCY2QKMjAyMy0wOC0yMANyY2IBMANhcHAFVmlkZW8CY3QZQ09OVEFJTkVEX1BPU1RfQVRUQUNITUVOVBNvcmlnaW5hbF9kdXJhdGlvbl9zBjEyMjEuNAJ0cxVwcm9ncmVzc2l2ZV9lbmNvZGluZ3MA&ccb=1-7&_nc_sid=3bbd7e&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=DSsb2zOkqrYAX-dWVXT&_nc_ht=scontent.fdad1-2.fna&oh=00_AfD6Wo0Z0kLe6Vt2Mtd4enydVibXM1u8XWP6WUPKBiMdlQ&oe=64E7B39E&_nc_rid=995414440173152&dl=1"
                    type="video/mp4"
                />
            </video> */}
            <div className="flex py-8">
                <div className="fixed md:w-48 lg:w-64 p-8 flex justify-center  bg-white shadow-md rounded-3xl nav overflow-hidden">
                    <div className="flex flex-col items-center  ">
                        <img src={Logo} alt="Logo" className="w-96 " />
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col text-lg mt-6">
                                <div className="flex flex-row items-center p-2 rounded-xl hover:-translate-y-2 hover:text-white hover:bg-[#818CF8] transform transition duration-300 ease-in-out cursor-pointer">
                                    <SvGHome className="w-5 h-5 " />
                                    <div className="ml-4">Home</div>
                                </div>
                                <div className="flex flex-row items-center p-2  rounded-xl hover:-translate-y-2 hover:bg-[#E0E7FF] transform transition duration-300 ease-in-out cursor-pointer">
                                    <SVGPopular className="w-5 h-5 " />
                                    <div className="ml-4">Popular</div>
                                    <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-teal-400 opacity-75 ml-3"></span>
                                </div>
                                <div className="flex flex-row items-center p-2 rounded-xl hover:-translate-y-2 hover:bg-[#E0E7FF] transform transition duration-300 ease-in-out cursor-pointer">
                                    <SVGGenre className="w-5 h-5 " />
                                    <div className="ml-4">Genre</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-8 w-full">
                            <span className="text-xl font-bold text-[#B5BAC3] mb-2">FAVOURITES</span>
                            <div className="flex flex-col text-lg">
                                {dataHome?.data?.carousel.slice(-3).map((item, index) => (
                                    <div className="flex flex-row mt-5">
                                        <img src={item.img} alt="" className="w-9" />
                                        <div className="flex items-center justify-center w-full rounded-e-lg bg-gradient-to-r from-teal-500 to-indigo-400 text-white">
                                            <span className="">{item.title} </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <span className="w-full text-xs absolute bottom-5 text-center text-[#B5BAC3]">
                            HCode.Anime Copyright © 2023
                        </span>
                    </div>
                </div>

                <div className="w-full ml-48 md:ml-48 lg:ml-64 px-16 py-4">
                    <header className="w-full flex">
                        <span className="font-extrabold rounded-s-full rounded-tr-full text-lg bg-teal-400 py-2 px-4  text-white shadow-lg shadow-teal-200">
                            Welcome!
                        </span>
                        <div className="flex items-center justify-center relative ml-5 w-1/2">
                            <input
                                type="text"
                                className="rounded-full p-2 pl-5 pr-10 w-full outline-none focus:ring-0 border-none bg-[#D1D5DB] text-lg "
                                placeholder="Search anime..."
                            />

                            <SVGSearch
                                className=" absolute top-1/2 right-4 transform -translate-y-1/2"
                                width="20"
                                height="20"
                            />
                        </div>
                    </header>

                    <Slide data={dataHome?.data?.carousel} current={current} setCurrent={setCurrent} />

                    <LoadMovieItems data={dataHome?.data?.latest_Episodes}>
                        <img
                            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/61c717ae-3d90-4186-bbef-9a7191eb6146/ddmainq-d4eb464c-826f-45e2-aed3-65b216ec12c8.png/v1/fill/w_891,h_720,strp/zenitsu_agatsuma_render___kimersu_no_yaiba_by_guntersw_ddmainq-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNjFjNzE3YWUtM2Q5MC00MTg2LWJiZWYtOWE3MTkxZWI2MTQ2XC9kZG1haW5xLWQ0ZWI0NjRjLTgyNmYtNDVlMi1hZWQzLTY1YjIxNmVjMTJjOC5wbmciLCJ3aWR0aCI6Ijw9ODkxIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.zDQ6eyN_1iGepS-buOb9y83KvMdxEPMk6HCCjl2AyQY"
                            alt=""
                            className="absolute -top-8 -left-8 w-20 "
                        />
                        <img src="https://i.imgur.com/QUvcecr.png" alt="" className="absolute -top-16 right-6 w-40 " />
                    </LoadMovieItems>

                    <LoadMovieItems data={dataHome?.data?.comingSoon}></LoadMovieItems>
                </div>
            </div>
        </div>
    );
}

export default Home;
