import { useEffect, useState } from "react"
import Welcome from "../../assets/mascot/tiger2.png"
import { getUserLogin } from "../../fetching/user"
import { useNavigate } from "react-router-dom"

const Welcome1 = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const data = await getUserLogin()
            setData(data.data)
            console.log(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async () => {
        navigate("/quiz")
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return <>
        <div className="w-full min-h-screen flex flex-col md:flex-row lg:flex-row 2xl:flex-row justify-center items-center">
            <img src={Welcome} alt="" className="w-1/2 md:w-[30%] lg:w-1/5 2xl:w-1/6" />
            <div className="md:w-1/2 lg:w-2/5 2xl:w-2/6 flex flex-col">
                <div className="bg-white border-2 border-gray-300 border-b-4 border-b-gray-400 text-left text-sm md:text-md lg:text-md 2xl:text-lg p-4 m-4 rounded-md gap-2 shadow-md">
                    <p>Halo <span className="font-extrabold text-lg md:text-lg lg:text-xl 2xl:text-2xl text-sky-500" >{data.username}</span>, kenalin aku <span className="font-extrabold text-lg md:text-lg lg:text-xl 2xl:text-2xl text-sky-500">Chibite</span>, aku yang bakal nemenin  perjalanan kamu buat dapetin tubuh ideal kamu, tapi sebelum itu chibite pengen lebih kenal sama kamu nih, boleh gaa isi beberapa pertanyaan biar chibite bisa nyiapin Program khusus buat kamu</p>
                </div>
                <div className="w-full px-4 flex justify-end item-end ">
                    <button onClick={handleClick} className="w-1/2 md:w-1/2 lg:w-2/6 2xl:w-1/5 px-4 py-2 text-sm md:text-md lg:text-md 2xl:text-lg text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Boleh Dong</button>
                </div>
            </div>
        </div>
    </>
}

export default Welcome1