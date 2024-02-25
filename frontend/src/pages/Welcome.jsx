import Tiger from "../assets/mascot/chibite.png"

const Welcome = () => {
    return <>
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col justify-center items-center md:flex lg:flex 2xl:flex md:flex-row lg:flex-row 2xl:flex-row md:justify-center lg:justify-center 2xl:justify-center md:items-center lg:items-center 2xl:items-center mx-10">
                <div className="md:mr-10 lg:mr-20 2xl:mr-20 w-[40%] md:w-[25%] lg:w-[27%] 2xl:w-[30%]"><img src={Tiger} alt="" /></div>
                <div className="md:w-2/5 lg:w-2/5 2xl:w-2/5">
                    <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl 2xl:text-2xl font-extrabold text-center my-4 md:my-6 lg:my-6 2xl:my-6">Mulai pola hidup sehat mu dengan <span className="text-[#00A9FF]">HealtyDu</span></h1>
                    <div className="px-4 py-4 mb-8 text-center text-white text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-xl font-extrabold border-b-4  border-b-[#006090] bg-[#00A9FF] rounded-lg">
                        <a href="/register">Daftar</a>
                    </div>
                    <div className="px-4 py-4 text-center text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-xl text-gray-600 font-extrabold border-b-4 border-2 border-[#BFBFBF] border-b-[#BFBFBF] bg-white rounded-lg">
                        <a href="/login">Sudah Punya Akun</a>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Welcome