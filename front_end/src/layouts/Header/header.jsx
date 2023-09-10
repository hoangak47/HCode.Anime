import FormSearch from '~/components/FormSearch';

function header() {
    const handleMenu = () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
    };

    return (
        <header className="w-full flex">
            <span className="font-extrabold hidden md:block rounded-s-full rounded-tr-full text-lg bg-teal-400 py-2 px-4  text-white shadow-lg shadow-teal-200">
                Welcome!
            </span>

            {/* ic menu span*3 */}

            <div className="flex md:hidden flex-col" onClick={handleMenu}>
                <span className="w-8 h-1 bg-gray-400 rounded-full my-1"></span>
                <span className="w-8 h-1 bg-gray-400 rounded-full my-1"></span>
                <span className="w-8 h-1 bg-gray-400 rounded-full my-1"></span>
            </div>

            <FormSearch />
        </header>
    );
}

export default header;
