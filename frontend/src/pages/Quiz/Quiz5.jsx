import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { addProgram } from "../../fetching/program";
import { getUserLogin } from "../../fetching/user";
import Question from "../../components/Question";
import ProgressBar from "../../components/ProgressBar";

const Quiz5 = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    const [progress, setProgress] = useState(80);
    const navigate = useNavigate()

    const courseId = new URLSearchParams(location.search).get("courseId");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserLogin();
                setUser(response.data);
                console.log("User >>> ", response.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, []);

    const handleAddProgram = async () => {
        try {
            setLoading(true);
            const newProgramIds = [];

            for (let i = 0; i < 20; i++) {
                const programName = `Latihan ${name} ${user.name}`;
                const programDescription = `Ayo mulai latih ${name} kamu`;

                const payload = {
                    name: programName,
                    description: programDescription
                };

                const createProgram = await addProgram(payload);
                const newProgramId = createProgram.id;

                newProgramIds.push(newProgramId);

                console.log(`Program ${i + 1} >>> `, createProgram);

                await new Promise(resolve => setTimeout(resolve, 100));
            }

            navigate(`/quiz6?&courseId=${courseId}&filter=${name}&programIds=${newProgramIds.join(",")}`, {
                state: { courseId, newProgramIds }
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateProgram = (e) => {
        setName(e.target.value);
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
                    <Question text="Area tubuh manakah yang ingin kamu latih?" />
                </div>
            </div>
            <ul className="grid gap-6 grid-rows-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 w-3/5 md:w-1/2 lg:w-1/3 2xl:w-1/3 text-md lg:text-lg 2xl:text-xl">
                <li>
                    <input type="radio" id="Seluruh Tubuh" value="Seluruh Tubuh" checked={name === 'Seluruh Tubuh'} onChange={handleCreateProgram} className="hidden peer" required />
                    <label for="Seluruh Tubuh" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Seluruh Tubuh</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="Perut" value="Perut" checked={name === 'Perut'} onChange={handleCreateProgram} className="hidden peer" required />
                    <label for="Perut" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Perut</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="Lengan" value="Lengan" checked={name === 'Lengan'} onChange={handleCreateProgram} className="hidden peer" required />
                    <label for="Lengan" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Lengan</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="Kaki" value="Kaki" checked={name === 'Kaki'} onChange={handleCreateProgram} className="hidden peer" required />
                    <label for="Kaki" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Kaki</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="Dada" value="Dada" checked={name === 'Dada'} onChange={handleCreateProgram} className="hidden peer" required />
                    <label for="Dada" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Dada</div>
                        </div>
                    </label>
                </li>
            </ul>
            <button onClick={handleAddProgram} className="px-4 py-2 text-md mb-4 lg:text-lg 2xl:text-xl text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Selanjutnya</button>
        </div>
    </>
}

export default Quiz5