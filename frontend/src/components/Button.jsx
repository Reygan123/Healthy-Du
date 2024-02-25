const Button = ({ onClick, text, border, bg, width }) => {
    return <>
        <button
            type="submit"
            onClick={onClick}
            className={`${width} py-2 text-xs md:text-md lg:text-md 2xl:text-lg text-white font-bold border-b-4 ${border} ${bg} rounded-md`}
        >
            {text}
        </button>
    </>
}

export default Button