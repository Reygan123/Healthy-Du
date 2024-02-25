import Bg from "../assets/bg1.png";

const Course = ({ name, description, onClick, bg }) => {
    return (
        <>
            <div className={`relative ${bg} rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg p-5 text-white overflow-hidden`}>
                <div
                    className="absolute inset-0 bg-cover"
                    style={{ backgroundImage: `url(${Bg})`, opacity: 0.5 }}
                ></div>

                <div className="relative z-10">
                    <p className="text-md md:text-md lg:text-md 2xl:text-lg font-bold mb-2">{name}</p>
                    <p className="text-xs md:text-sm lg:text-sm 2xl:text-md mb-2">{description}</p>
                    <button
                        onClick={onClick}
                        className="text-sm md:text-md lg:text-md 2xl:text-lg text-sky-500 px-6 md:px-8 lg:px-10 2xl:px-10 py-2 bg-white rounded-md font-extrabold"
                    >
                        Lihat
                    </button>
                </div>
            </div>
        </>
    );
};

export default Course;
