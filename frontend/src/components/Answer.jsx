import React from "react";

const Answer = ({ type, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="my-2 md:my-4 lg:my-4 2xl:my-6 font-bold border-2 border-[#BFBFBF] border-b-4 px-4 py-2 text-md w-full rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg"
            required
        />
    );
};

export default Answer;
