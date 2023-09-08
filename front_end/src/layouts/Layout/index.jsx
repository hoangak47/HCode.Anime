import './index.scss';

import Nav from '../Nav/nav';
import Header from '../Header/header';

function layout({ children }) {
    return (
        <div className=" mx-auto md:px-8 px-1">
            <div className="flex md:py-8">
                <Nav />

                <div className="w-full ml-0 md:ml-48 lg:ml-64 md:px-10 lg:px-16 py-4">
                    <Header />

                    {children}
                </div>
            </div>
        </div>
    );
}

export default layout;
