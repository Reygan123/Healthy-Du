import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getExercise } from "../../fetching/exercise"
import { getAllProgramExercise } from "../../fetching/program_exercise"
import { getUserLogin } from "../../fetching/user"
import { createJoinCourse } from "../../fetching/join_course"
import { getProgrambyId } from "../../fetching/program"
import { getAllExerciseCategory } from "../../fetching/exercise_category"
import Push from "../../assets/push.jpeg"
import Loading from "../../components/Loading"
import Navbar from "../../components/Navbar"

const ListProgram = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState([])
    const [user, setUser] = useState([])
    const [exercise, setExercise] = useState([])
    const [program, setProgram] = useState([])
    const [programExercise, setProgramExercise] = useState([])
    const [selectedExercise, setSelectedExercise] = useState({})
    const navigate = useNavigate()

    const courseId = new URLSearchParams(location.search).get("courseId");
    const programId = new URLSearchParams(location.search).get("programId");

    const fetchProgramExercise = async () => {
        try {
            const programExercise = await getAllProgramExercise(1, 10, programId, "")
            setProgramExercise(programExercise.data)
            setLoading(false)
            console.log("Program Exercise >>>> ", programExercise.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCategory = async (exercise) => {
        try {
            const category = await getAllExerciseCategory("", "", exercise, "")
            setCategory(category.data)
            console.log(">>>", category.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchExercise = async () => {
        try {
            const exercise = await getExercise(1, 10, "", "", "");
            setExercise(exercise.data);
            console.log("Exercise >>>", exercise.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUser = async () => {
        try {
            const user = await getUserLogin();
            setUser(user.data);
            console.log("User >>>", user.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProgram = async () => {
        try {
            const program = await getProgrambyId(programId)
            setProgram(program.data)
            console.log("Program >>>>", program.data)
        } catch (error) {
            console.log(error)
        }
    }

    const openModal = (exercise) => {
        setSelectedExercise(exercise);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleStartClick = async (courseId, programId) => {
        try {
            const payload = {
                userId: user.id,
                courseId: courseId,
            }

            const response = await createJoinCourse(payload)
            console.log(response)

            navigate(`/course/list/start?&courseId=${courseId}&programId=${programId}`, {
                state: { courseId, programId }
            });
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchProgramExercise();
        fetchExercise();
        fetchUser();
        fetchProgram();
        setLoading(true);
    }, []);

    useEffect(() => {
        // Panggil fetchCategory dengan exerciseId yang sesuai
        if (selectedExercise.id) {
            fetchCategory(selectedExercise.id);
        }
    }, [selectedExercise]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <div className="w-full">
                <div className="flex justify-center items-center">
                    <div className="w-1/2 md:w-1/4 lg:w-1/5 2xl:w-1/5 bg-sky-500 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg p-4 text-center text-white">
                        <h1 className="font-extrabold text-sm md:text-md lg:text-md 2xl:text-lg">{program.name}</h1>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center my-4">
                    {programExercise.map((item) => (
                        <div key={item.id} className="px-14 py-2 w-4/5 md:px-16 md:py-4 md:w-1/2 lg:px-24 lg:py-8 lg:w-1/2 2xl:px-24 2xl:py-8 2xl:w-1/2 border bg-white">
                            <div className="cursor-pointer" onClick={() => openModal(item.Exercise)}>
                                <p className="text-sm md:text-md lg:text-md 2xl:text-lg font-bold">{item.Exercise.name}</p>
                                <p className="text-xs md:text-sm lg:text-sm 2xl:text-md text-gray-500">{item.Exercise.repetition_value}x</p>
                                <p className="text-xs md:text-sm lg:text-sm 2xl:text-md text-gray-500">00:{item.Exercise.repetition_time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center mb-4">
                    <button className="py-2 text-sm md:text-md lg:text-md 2xl:text-lg w-1/2 md:w-1/4 lg:w-1/5 2xl:w-1/5 rounded-md md:rounded-lg lg:rounded-lg font-bold bg-sky-500 border-b-4 mb-2 border-sky-800 text-white" onClick={() => handleStartClick(courseId, programId)}>Mulai</button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className="aspect-video">
                                            <iframe
                                                title="YouTube Video"
                                                className="w-full h-full"
                                                src={`https://www.youtube.com/embed/${selectedExercise.link}}`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        {/* <div className="w-full">
                                            <img src={Push} alt="" className="w-fit" />
                                        </div> */}
                                        <div className="py-4">
                                            <h3 className="text-center text-sm md:text-md lg:text-md 2xl:text-lg leading-6 text-gray-900 font-bold">{selectedExercise.name}</h3>
                                            <p className="text-left text-xs md:text-sm lg:text-sm 2xl:text-md">{selectedExercise.description}</p>
                                            <h1 className="text-center font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-2">Area Fokus</h1>
                                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-6 2xl:gap-6 text-xs md:text-sm lg:text-sm 2xl:text-md my-2">
                                                {category.map((categoryItem) => (
                                                    <div key={categoryItem.id} className="px-2 py-1 rounded-md border border-gray-300 bg-white flex justify-center items-center gap-2">
                                                        <div className="p-1 rounded-full bg-sky-500"></div>
                                                        <p className="font-semibold">{categoryItem.Category.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={closeModal} type="button" className="text-sm md:text-md lg:text-md 2xl:text-lg mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-md font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                                Tutup
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListProgram;
