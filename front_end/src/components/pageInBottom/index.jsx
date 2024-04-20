import { Link } from 'react-router-dom';
import { SVGPrev } from '~/assets/SVG';

function PageInBottom({ data, page, customLink }) {
    console.log(data);
    return (
        <div className="flex items-center justify-center mt-6">
            <ul
                className={`flex items-center -space-x-px h-10 text-base transform md:scale-100 ${
                    data?.data?.pagination?.length >= 9 ? 'scale-75' : 'scale-90'
                }`}
            >
                {data?.data?.pagination.map((item, index) => {
                    return (
                        <li key={index}>
                            {item.page === 'prev' ? (
                                <Link
                                    to={`${customLink ? customLink : ''}${item.link}`}
                                    className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <SVGPrev />
                                </Link>
                            ) : item.page === 'next' ? (
                                <Link
                                    to={`${customLink ? customLink : ''}${item.link}`}
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <SVGPrev className="transform rotate-180 h-3 w-3" />
                                </Link>
                            ) : item.link === null ? (
                                <span
                                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-not-allowed ${
                                        Number(page) === item.page ? 'dark:bg-gray-700 dark:text-white ' : ''
                                    } `}
                                >
                                    {item.page}
                                </span>
                            ) : (
                                <Link
                                    to={`${customLink ? customLink : ''}${item.link}`}
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    {item.page}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PageInBottom;
