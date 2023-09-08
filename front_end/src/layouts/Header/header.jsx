import FormSearch from '~/components/FormSearch';

function header() {
    return (
        <header className="w-full flex">
            <span className="font-extrabold rounded-s-full rounded-tr-full text-lg bg-teal-400 py-2 px-4  text-white shadow-lg shadow-teal-200">
                Welcome!
            </span>

            <FormSearch />
        </header>
    );
}

export default header;
