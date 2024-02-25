const TextArea = ({ type, value, onChange, placeholder }) => {
    return <>
        <textarea
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
            rows={10}
            cols={50}
        />
    </>
}

export default TextArea