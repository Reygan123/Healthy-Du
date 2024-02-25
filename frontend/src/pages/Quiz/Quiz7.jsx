import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { updateUser } from "../../fetching/user";
import Question from "../../components/Question";
import ProgressBar from "../../components/ProgressBar";

const Quiz2 = () => {
    const [loading, setLoading] = useState(false)
    const [activity_factor, setActivity] = useState(0)
    const [progress, setProgress] = useState(32);
    const navigate = useNavigate()

    const handleActivity = async () => {
        try {
            const payloadActivity = {
                activity_factor
            }
            const responseActivity = await updateUser(payloadActivity)
            console.log(">>>>", responseActivity)
            navigate("/quiz3")
        } catch (error) {
            console.log(error)
        }
    }

    const handleActivityChange = (e) => {
        setActivity(e.target.value);
    };

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return <Loading />
    }

    return <>
        <div className="flex flex-col items-center py-2 justify-between min-h-screen">
            <div className="flex flex-col w-full items-center">
                <div className="my-2 w-3/4 md:w-3/5 lg:w-1/2 2xl:w-1/2 ">
                    <ProgressBar progress={progress} />
                </div>
                <div className="my-4 w-3/5 md:w-1/2 lg:w-1/3 2xl:w-1/3">
                    <Question text="Bagaimana aktivitas harian kamu?" />
                </div>
            </div>

            <ul className="grid gap-6 grid-rows-2 w-3/5 md:w-1/2 lg:w-1/3 2xl:w-1/3 text-md lg:text-lg 2xl:text-xl">
                <li>
                    <input type="radio" id="sedentary" value={1.2} checked={activity_factor === 1.2} onChange={handleActivityChange} className="hidden peer" required />
                    <label htmlFor="sedentary" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Tidak Aktif, Suka Rebahan</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="lighty" value={1.375} checked={activity_factor === 1.375} onChange={handleActivityChange} className="hidden peer" required />
                    <label htmlFor="lighty" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Aktivitas Ringan, Olahraga 1-3x/Minggu</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="moderately" value={1.55} checked={activity_factor === 1.55} onChange={handleActivityChange} className="hidden peer" required />
                    <label htmlFor="moderately" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Aktivitas Menengah, Olahraga 3-5x/Minggu</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="very" value={1.725} checked={activity_factor === 1.725} onChange={handleActivityChange} className="hidden peer" required />
                    <label htmlFor="very" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Aktivitas Berat, Olahraga 5-7x/Minggu</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="extreme" value={1.9} checked={activity_factor === 1.9} onChange={handleActivityChange} className="hidden peer" required />
                    <label htmlFor="extreme" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Sangat Aktif, Olahraga 2-3x/Hari</div>
                        </div>
                    </label>
                </li>
            </ul>
            <button onClick={handleActivity} className="px-4 mb-4 py-2 text-md lg:text-lg 2xl:text-xl text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Selanjutnya</button>
        </div>
    </>
}

export default Quiz2