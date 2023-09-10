import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function LoadEpisodes({ className, data, currenEpisode, children, loading }) {
    return (
        <Fragment>
            {loading ? (
                <Fragment>
                    <p className="text-lg sm:text-xl font-bold block animate-pulse w-1/2 h-8 rounded-md bg-gray-300"></p>
                    <div className="flex flex-wrap overflow-y-auto">
                        {Array.from(Array(20).keys()).map((item, index) => (
                            <div key={index} className="animate-pulse w-14 h-8 rounded-md bg-gray-300 mt-2 mr-2"></div>
                        ))}
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    {children}
                    <div className={`flex flex-wrap overflow-y-auto ${className}`}>
                        {data?.map((item, index) => (
                            <Link
                                to={`/watch/${item.link}`}
                                key={index}
                                className={`inline-block text-sm text-white bg-teal-500 rounded-md px-2 py-1 mt-2 mr-2 w-14 text-center ${
                                    currenEpisode === item.episode && 'bg-teal-700 cursor-default'
                                }`}
                            >
                                {item.episode}
                            </Link>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default LoadEpisodes;
