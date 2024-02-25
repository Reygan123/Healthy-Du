import Wait from "../assets/mascot/wait.png"

const Loading = () => {
    return <>
        <div className="flex min-h-screen flex-col justify-center items-center text-center">
            <img src={Wait} alt="" />
            <h1 className="font-extrabold text-lg md:text-lg lg:text-xl 2xl:text-2xl text-gray-500">Memuat...</h1>
            <p className="font-bold w-3/4 text-sm md:text-md lg:text-md 2xl:text-lg lg:w-1/5 2xl:w-1/5">Berlatih setiap hari agar kamu dapat meraih tubuh impian mu</p>
        </div >
    </>
}

export default Loading