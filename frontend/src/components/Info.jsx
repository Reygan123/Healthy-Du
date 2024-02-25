const Info = ({ title, subtitle, unit }) => {
    return <>
        <div className="w-full py-2 md:py-4 lg:py-4 2xl:py-6 text-sm md:text-md lg:text-md 2xl:text-lg border text-gray-500 text-center border-gray-300 bg-white rounded-md">
            <h1>{title}</h1>
            <p className="font-bold">{subtitle}<span>{unit}</span></p>
        </div>
    </>
}

export default Info