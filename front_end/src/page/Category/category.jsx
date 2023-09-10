import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadMovieItems from '~/components/loadMovieItems';
import PageInBottom from '~/components/pageInBottom';
import Layout from '~/layouts/Layout';
import { getGenreDetail } from '~/redux/features/apiRequest';
import { Helmet } from 'react-helmet';

function Category() {
    const { page, name } = useParams();
    const dispatch = useDispatch();

    const data = useSelector((state) => state?.genre?.category_detail);

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getGenreDetail(dispatch, axios, name, page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, name]);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data?.data?.title}</title>
                <meta name="description" content="Category" />
            </Helmet>

            <Layout>
                <LoadMovieItems
                    loading={data?.loading}
                    data={data?.data?.data?.latest_Episodes}
                    title={`${data?.data?.data?.title} ${page > 1 ? ` - Page ${page}` : ''}`}
                    pageInBottom={PageInBottom({ data: data?.data, page, customLink: '/category' })}
                />
            </Layout>
        </>
    );
}

export default Category;
