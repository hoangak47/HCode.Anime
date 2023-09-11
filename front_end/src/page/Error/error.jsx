import React from 'react';
import Layout from '~/layouts/Layout';

function Error() {
    return (
        <Layout>
            {/* 404 - Page Not Found */}
            <div className="flex justify-center items-center bg-white rounded-md shadow-md mt-20 p-10 py-32">
                <div className="text-4xl font-bold text-center">
                    <p>404 - Page Not Found</p>
                    <p className="text-2xl font-medium">Sorry, the page you are looking for does not exist.</p>
                </div>
            </div>
        </Layout>
    );
}

export default Error;
