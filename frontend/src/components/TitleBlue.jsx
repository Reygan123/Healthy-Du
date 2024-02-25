const Title = ({ text }) => {
    return <>
        <div className="py-2 px-4 md:px-4 lg:px-8 2xl:py-4 2xl:px-14 text-xs md:text-md lg:text-md 2xl:text-xl bg-white border-2 border-b-4 lg:border-b-[6px] border-sky-500 rounded-md 2xl:rounded-lg">
            <h3 className="font-extrabold text-center text-sky-500">{text}</h3>
        </div>
    </>
}

export default Title