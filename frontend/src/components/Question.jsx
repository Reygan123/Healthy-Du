const Question = ({ text }) => {
    return <>
        <div className="font-bold border-2 bg-white border-[#BFBFBF] py-2 px-4 2xl:py-4 2xl:px-8 text-md lg:text-lg 2xl:text-xl w-full rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg">
            <p>{text}</p>
        </div>
    </>
}

export default Question