import FormSearch from '~/components/FormSearch';

function header() {
    const handleMenu = () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
    };

    return (
        <header className="w-full flex items-center">
            <span className="font-extrabold hidden md:block rounded-s-full rounded-tr-full text-lg bg-teal-400 py-2 px-4  text-white shadow-lg shadow-teal-200">
                Welcome!
            </span>

            {/* ic menu span*3 */}

            <div className="flex md:hidden flex-col p-2 bg-teal-400  shadow-md rounded-sm" onClick={handleMenu}>
                <span className="w-6 h-1 bg-slate-100 rounded-full my-[2px]"></span>
                <span className="w-6 h-1 bg-slate-100 rounded-full my-[2px]"></span>
                <span className="w-6 h-1 bg-slate-100 rounded-full my-[2px]"></span>
            </div>

            <FormSearch />
        </header>
    );
}

export default header;
