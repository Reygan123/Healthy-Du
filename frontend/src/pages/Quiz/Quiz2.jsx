import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { updateUser } from "../../fetching/user";
import Question from "../../components/Question";
import ProgressBar from "../../components/ProgressBar";

const Quiz2 = () => {
    const [loading, setLoading] = useState(false)
    const [gender, setGender] = useState("")
    const [progress, setProgress] = useState(32);
    const navigate = useNavigate()

    const handleGender = async () => {
        try {
            const payloadGender = {
                gender
            }
            const responseGender = await updateUser(payloadGender)
            console.log(">>>>", responseGender)
            navigate("/quiz7")
        } catch (error) {
            console.log(error)
        }
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value);
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
                    <Question text="Apa jenis kelamin kamu?" />
                </div>
            </div>

            <ul className="grid gap-6 grid-rows-2 w-3/5 md:w-1/2 lg:w-1/3 2xl:w-1/3 text-md lg:text-lg 2xl:text-xl">
                <li>
                    <input type="radio" id="Laki-Laki" name="hosting" value="Laki-Laki" checked={gender === 'Laki-Laki'} onChange={handleGenderChange} className="hidden peer" required />
                    <label for="Laki-Laki" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Laki-Laki</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="Perempuan" name="hosting" value="Perempuan" checked={gender === 'Perempuan'} onChange={handleGenderChange} className="hidden peer" required />
                    <label for="Perempuan" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Perempuan</div>
                        </div>
                    </label>
                </li>
            </ul>
            <button onClick={handleGender} className="px-4 mb-4 py-2 text-md lg:text-lg 2xl:text-xl text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Selanjutnya</button>
        </div>
    </>
}

export default Quiz2