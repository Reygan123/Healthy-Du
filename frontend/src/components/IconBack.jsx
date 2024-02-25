import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBack from '../assets/back.png';

const IconBack = ({ to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button className="p-2 md:p-4 lg:p-4 2xl:p-6 border border-b-2 border-red-500 rounded-md bg-white" onClick={handleClick}>
            <span><img src={ArrowBack} alt="" className="w-4 h-4 mr-1" /></span>
        </button>
    );
};

export default IconBack;
