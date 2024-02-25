import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllExerciseCategory } from "../../fetching/exercise_category";
import { createProgramExercise } from "../../fetching/program_exercise";
import { getExercise } from "../../fetching/exercise";
import { getAllWeek } from "../../fetching/week";
import { createSchedule } from "../../fetching/schedule";
import Question from "../../components/Question";
import ProgressBar from "../../components/ProgressBar";
import Loading from "../../components/Loading";

const Quiz6 = () => {
    const [loading, setLoading] = useState(false)
    const [week, setWeek] = useState([])
    const [exercise, setExercise] = useState([])
    const [programIds, setProgramIds] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [progress, setProgress] = useState(100);
    const navigate = useNavigate()
    const location = useLocation();

    const courseId = new URLSearchParams(location.search).get("courseId");
    const filter = new URLSearchParams(location.search).get("filter");

    useEffect(() => {
        const queryProgramIds = new URLSearchParams(location.search).get("programIds");
        if (queryProgramIds) {
            const idsArray = queryProgramIds.split(",");
            setProgramIds(idsArray);

            console.log("Program IDs from URL:", idsArray);
        }
    }, [location.search]);

    const fetchWeek = async () => {
        try {
            const week = await getAllWeek(1, 10, "")
            setWeek(week.data)
            console.log("Week >>>>", week.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchExercise = async () => {
        try {
            const exerciseResponse = await getAllExerciseCategory("", 1000, "", "");
            const allExercises = exerciseResponse.data;

            const categoryIdFromFilter = allExercises.find(exercise => exercise.Category.name === filter)?.Category.id;

            const filteredExercises =
                selectedLevel !== ""
                    ? allExercises.filter((exercise) => exercise.Exercise.level === selectedLevel && exercise.category_id === categoryIdFromFilter)
                    : allExercises.filter(exercise => exercise.category_id === categoryIdFromFilter);

            setExercise(filteredExercises);
            console.log("Filtered Exercises >>>> ", filteredExercises);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };


    const getRandomExercises = (exercises, count) => {
        const shuffledExercises = exercises.sort(() => 0.5 - Math.random());
        return shuffledExercises.slice(0, count);
    };

    const handleAddProgramExercise = async () => {
        try {
            setLoading(true);
            const randomExercises = getRandomExercises(exercise, 2);

            for (const programId of programIds) {
                for (const selectedExercise of randomExercises) {
                    const payload = {
                        programId: programId,
                        exerciseId: selectedExercise.exercise_id
                    };
                    const response = await createProgramExercise(payload);
                    console.log("Program exercises ", response);
                }
            }

            const usedProgramIds = [];

            for (const currentWeek of week) {
                const availableProgramIds = programIds.filter((programId) => !usedProgramIds.includes(programId));

                const weekProgramIds = availableProgramIds.slice(0, 5);

                for (const programId of weekProgramIds) {
                    usedProgramIds.push(programId);

                    const schedulePayload = {
                        courseId: courseId,
                        programId: programId,
                        weekId: currentWeek.id
                    };
                    const responseSchedule = await createSchedule(schedulePayload);
                    console.log("Schedule added successfully", responseSchedule);
                }
            }

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        fetchWeek()
        fetchExercise()
        setLoading(false)
    }, [selectedLevel])

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
                    <Question text="Berapa kali kamu bisa push-up sekaligus?" />
                </div>
            </div>
            <ul className="grid gap-6 grid-rows-3 w-3/5 md:w-1/2 lg:w-1/3 2xl:w-1/3 text-md lg:text-lg 2xl:text-xl">
                <li>
                    <input type="radio" id="easy" value="easy" checked={selectedLevel === "easy"} onChange={() => setSelectedLevel("easy")} className="hidden peer" required />
                    <label for="easy" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">3 - 5</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="medium" value="medium" checked={selectedLevel === "medium"} onChange={() => setSelectedLevel("medium")} className="hidden peer" required />
                    <label for="medium" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">5 - 15</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="hard" value="hard" checked={selectedLevel === "hard"} onChange={() => setSelectedLevel("hard")} className="hidden peer" required />
                    <label for="hard" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border-2 border-[#BFBFBF] rounded-lg cursor-pointer peer-checked:border-sky-500 peer-checked:text-sky-500 peer-checked:font-bold hover:text-sky-500 hover:border-sky-500 hover:font-bold text-center border-b-4 hover:border-b-sky-500 peer-checked:border-b-sky-500">
                        <div className="block">
                            <div className="w-full">Lebih dari 15</div>
                        </div>
                    </label>
                </li>
            </ul>
            <button onClick={handleAddProgramExercise} className="px-4 mb-4 py-2 text-md lg:text-lg 2xl:text-xl text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Selanjutnya</button>
        </div>
    </>
}

export default Quiz6