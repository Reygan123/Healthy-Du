import { useNavigate } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin"
import Burger from "../assets/icon/burger.png"
import Fitness from "../assets/icon/fitness.png"
import Pengguna from "../assets/icon/user.png"
import Recipe from "../assets/icon/recipe.png"
import Chibite from '../assets/mascot/tiger1.png'

const HomeAdmin = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/admin/food")
    }

    const handleClickProgram = () => {
        navigate("/program")
    }

    const handleClickReceipt = () => {
        navigate("/admin/recipe")
    }

    const handleClickUser = () => {
        navigate("/user")
    }

    return <>
        <NavbarAdmin />
        <div className='bg-white shadow-md p-2 mb-20 md:flex lg:flex 2xl:flex flex-col-reverse justify-center items-center md:flex-row lg:flex-row 2xl:flex-row hidden rounded-md m-4'>
            <div className='p-4 md:p-4 lg:p-6 2xl:p-8 flex flex-col justify-center items-center text-center md:flex md:justify-center md:items-start md:text-left lg:flex lg:justify-center lg:items-start lg:text-left 2xl:flex 2xl:justify-center 2xl:items-start 2xl:text-left'>
                <h1 className='text-wrap lg:text-balance text-lg md:text-lg lg:text-xl 2xl:text-2xl font-extrabold mb-2 lg:mb-2 2xl:mb-4'>Halooo Admin</h1>
                <p className='text-justify text-sm md:text-md lg:text-md 2xl:text-lg my-2 lg:my-4 2xl:my-4'>Kamu adalah seorang admin, admin memiliki fitur fitur khusus yang tidak bisa di dapatkan oleh pengguna, yaitu fitur yang dapat mengelola berbagai data</p>
                <button className='text-sm md:text-md lg:text-md 2xl:text-lg px-10 py-2 lg:px-14 2xl:px-14 border-b-4 border-[#006090] bg-[#00A9FF] rounded-md text-white font-extrabold'>Mulai</button>
            </div>
            <div className='w-1/2 md:w-full lg:w-1/3 2xl:w-2/5 flex justify-center items-center'>
                <img src={Chibite} alt="" />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 2xl:grid-cols-4 gap-4 px-4">
            <div className={`relative flex flex-col text-center justify-center items-center bg-gradient-to-br from-yellow-400 to-orange-600 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg p-5 text-white`}>
                <div className="w-full ">
                    <div className="absolute inset-x-[42%] -top-10 p-4 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 lg:w-2/12 2xl:w-2/12 shadow-md ">
                        <img className="w-full shadow-md" src={Burger} alt="" />
                    </div>
                    <p className="text-md md:text-md lg:text-md 2xl:text-lg font-bold lg:mb-6 2xl:mb-6">Kelola Makanan</p>
                    <button
                        onClick={handleClick}
                        className="text-sm md:text-md lg:text-md 2xl:text-lg text-yellow-400 px-6 md:px-8 lg:px-8 2xl:px-10 py-2 bg-white rounded-md font-extrabold"
                    >
                        Lihat
                    </button>
                </div>
            </div>
            <div className={`relative flex flex-col text-center justify-center items-center bg-gradient-to-br from-red-500 to-red-700 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg p-5 text-white`}>
                <div className="w-full ">
                    <div className="absolute inset-x-[42%] -top-10 p-4 rounded-full bg-gradient-to-br from-red-300 to-red-500 lg:w-2/12 2xl:w-2/12 shadow-md ">
                        <img className="w-full shadow-md" src={Recipe} alt="" />
                    </div>
                    <p className="text-md md:text-md lg:text-md 2xl:text-lg font-bold lg:mb-6 2xl:mb-6">Kelola Resep</p>
                    <button
                        onClick={handleClickReceipt}
                        className="text-sm md:text-md lg:text-md 2xl:text-lg text-red-500 px-6 md:px-8 lg:px-8 2xl:px-10 py-2 bg-white rounded-md font-extrabold"
                    >
                        Lihat
                    </button>
                </div>
            </div>
            <div className={`relative flex flex-col text-center justify-center items-center bg-gradient-to-br from-sky-500 to-sky-700 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg p-5 text-white`}>
                <div className="w-full ">
                    <div className="absolute inset-x-[42%] -top-10 p-4 rounded-full bg-gradient-to-br from-sky-300 to-sky-500 lg:w-2/12 2xl:w-2/12 shadow-md ">
                        <img className="w-full shadow-md" src={Fitness} alt="" />
                    </div>
                    <p className="text-md md:text-md lg:text-md 2xl:text-lg font-bold lg:mb-6 2xl:mb-6">Kelola Program</p>
                    <button
                        onClick={handleClickProgram}
                        className="text-sm md:text-md lg:text-md 2xl:text-lg text-sky-500 px-6 md:px-8 lg:px-8 2xl:px-10 py-2 bg-white rounded-md font-extrabold"
                    >
                        Lihat
                    </button>
                </div>
            </div>
            <div className={`relative flex flex-col text-center justify-center items-center bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg p-5 text-white`}>
                <div className="w-full ">
                    <div className="absolute inset-x-[42%] -top-10 p-4 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 lg:w-2/12 2xl:w-2/12 shadow-md ">
                        <img className="w-full shadow-md" src={Pengguna} alt="" />
                    </div>
                    <p className="text-md md:text-md lg:text-md 2xl:text-lg font-bold lg:mb-6 2xl:mb-6">Kelola Pengguna</p>
                    <button
                        onClick={handleClickUser}
                        className="text-sm md:text-md lg:text-md 2xl:text-lg text-cyan-500 px-6 md:px-8 lg:px-8 2xl:px-10 py-2 bg-white rounded-md font-extrabold"
                    >
                        Lihat
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default HomeAdmin