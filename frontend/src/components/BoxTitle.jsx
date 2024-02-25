const BoxTitle = ({ text }) => {
    return <>
        <div className="text-sm md:text-md lg:text-md 2xl:text-lg bg-white px-4 py-2 md:px-16 lg:px-24 2xl:px-24 border border-b-4 rounded-md border-sky-500 border-b-sky-500 text-sky-500 font-bold">
            <p>{text}</p>
        </div>
    </>
}

export default BoxTitle