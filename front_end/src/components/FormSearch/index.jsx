import './index.scss';

import { SVGSearch } from '~/assets/SVG';
import { useDebounce } from '@uidotdev/usehooks';
import React from 'react';
import { getSearchMovie } from '~/redux/features/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getSearchSuccess } from '~/redux/features/searchSlice';

function FormSearch() {
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const dataSearch = useSelector((state) => state.search.search.data);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!e.target[0].value) {
            return;
        }
        navigation(`/search/${e.target[0].value}`);

        e.target.reset();
        setSearch('');
        e.target[0].blur();
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    React.useEffect(() => {
        if (!debouncedSearch) {
            dispatch(getSearchSuccess(null));
            return;
        }
        getSearchMovie(dispatch, axios, debouncedSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    return (
        <form className="flex items-center justify-center relative ml-5 w-full md:w-1/2" onSubmit={handleSubmit}>
            <input
                type="search"
                className="rounded-full p-2 pl-5 pr-10 w-full outline-none focus:ring-0 border-none bg-[#D1D5DB] text-lg "
                placeholder="Search anime..."
                onChange={handleSearch}
            />

            {dataSearch?.data?.latest_Episodes && (
                <div className="absolute transform w-full bg-white z-10 rounded-lg top-full overflow-hidden search-items invisible opacity-0 transition-all duration-500 ease-in-out border border-gray-200 shadow-lg">
                    {dataSearch?.data?.latest_Episodes.length > 0 ? (
                        <>
                            {dataSearch?.data?.latest_Episodes?.map((item, index) => (
                                <Link
                                    to={`/detail/${item.link}`}
                                    key={index}
                                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <img src={item.img} alt="" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="ml-2">
                                        <p className="text-sm">{item.title}</p>
                                    </div>
                                </Link>
                            ))}
                            <Link
                                to={`/search/${debouncedSearch}`}
                                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <div className="ml-2">
                                    <p className="text-sm">Xem thêm</p>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <p className="text-sm h-10 flex items-center justify-center">Không tìm thấy kết quả</p>
                    )}
                </div>
            )}

            <button type="submit">
                <SVGSearch className=" absolute top-1/2 right-4 transform -translate-y-1/2" width="20" height="20" />
            </button>
        </form>
    );
}

export default FormSearch;
