import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LoadMovieItems from '~/components/loadMovieItems';
import PageInBottom from '~/components/pageInBottom';
import Layout from '~/layouts/Layout';
import { getSearchAllMovie } from '~/redux/features/apiRequest';
import { getSearchAllSuccess } from '~/redux/features/searchSlice';
function Search() {
    const { name, page } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(getSearchAllSuccess(null));
        getSearchAllMovie(dispatch, axios, name, page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, page]);

    const dataSearch = useSelector((state) => state.search.searchAll);
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (dataSearch?.data?.data?.link) {
            dispatch(getSearchAllSuccess(null));
            navigate(`/detail/${dataSearch?.data?.data?.link}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSearch]);

    return (
        <Layout>
            <LoadMovieItems
                loading={dataSearch?.loading}
                data={dataSearch?.data?.data?.latest_Episodes}
                title={dataSearch?.data?.data?.title}
                pageInBottom={PageInBottom({ data: dataSearch?.data, page })}
            />
        </Layout>
    );
}

export default Search;
