const Search = ({ placeholder, onChange }) => {
    return <>
        <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            className="px-4 py-2 md:px-16 lg:px-28 2xl:px-36 md:py-4 lg:py-4 2xl:py-6 text-sm md:text-lg lg:text-xl 2xl:text-2xl border border-b-4 border-gray-300 rounded-md"
        />
    </>
}

export default Search