import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadMovieItems from '~/components/loadMovieItems';
import PageInBottom from '~/components/pageInBottom';
import Layout from '~/layouts/Layout';
import { getSeeAllMovie } from '~/redux/features/apiRequest';
import { Helmet } from 'react-helmet';

function SeeAllLastMovie() {
    const { page } = useParams();
    console.log(page);
    const dispatch = useDispatch();

    const data = useSelector((state) => state.seeAll.data);

    React.useEffect(() => {
        getSeeAllMovie(dispatch, axios, page);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    React.useEffect(() => {}, [data]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>See All Last Movie</title>
                <meta name="description" content="See All Last Movie" />
            </Helmet>

            <Layout>
                <LoadMovieItems
                    loading={data?.loading}
                    data={data?.data?.data?.latest_Episodes}
                    title="Mới nhất"
                    pageInBottom={PageInBottom({ data: data?.data, page })}
                />
            </Layout>
        </>
    );
}

export default SeeAllLastMovie;
