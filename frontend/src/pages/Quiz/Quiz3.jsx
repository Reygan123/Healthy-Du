import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { updateUser } from "../../fetching/user";
import Question from "../../components/Question";
import Answer from "../../components/Answer";
import ProgressBar from "../../components/ProgressBar";

const Quiz3 = () => {
    const [loading, setLoading] = useState(false)
    const [weight, setWeight] = useState("")
    const [progress, setProgress] = useState(48);
    const navigate = useNavigate()

    const handleWeight = async () => {
        try {
            const payloadWeight = {
                weight
            }
            const responseWeight = await updateUser(payloadWeight)
            console.log(">>>>", responseWeight)
            navigate("/quiz4")
        } catch (error) {
            console.log(error)
        }
    }

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
                    <Question text="Berapa berat badan kamu?" />
                </div>
            </div>
            <div className="w-3/5 md:w-1/2 lg:w-1/3 2xl:w-1/3">
                <Answer
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Masukkan berat badan kamu"
                />
            </div>
            <button onClick={handleWeight} className="px-4 mb-4 py-2 text-md lg:text-lg 2xl:text-xl text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Selanjutnya</button>
        </div>
    </>
}

export default Quiz3