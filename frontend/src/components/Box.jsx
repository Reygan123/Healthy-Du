const Box = ({ title, text }) => {
    return <>
        <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">{title}</h1>
        <div className="border p-2 bg-white border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3">
            {text}
        </div>
    </>
}

export default Box