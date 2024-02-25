const RecipeBox = ({ text, img }) => {
    return (
        <div className="border border-b-2 py-2 border-[#CCCCCC] border-b-gray-400 rounded-md text-center bg-white">
            <div className='m-1'>
                <img
                    src={img}
                    alt=""
                    className="rounded-md w-fit h-fit object-cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <h1 className="text-sm md:text-md lg:text-md 2xl:text-lg">{text}</h1>
        </div>
    );
};

export default RecipeBox;
