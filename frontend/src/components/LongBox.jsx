const LongBox = ({ text }) => {
    return <>
        <div className="border p-2 md:p-4 lg:p-4 2xl:p-6 whitespace-pre-line border-gray-300 rounded-md text-sm md:text-md lg:text-md 2xl:text-lg bg-white">
            <div className="text-gray-500">
                <p>{text}</p>
            </div>
        </div>
    </>
}

export default LongBox