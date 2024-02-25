import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProgrambyId, updateProgram } from "../../fetching/program";
import { getAllSchedule, updateSchedule } from "../../fetching/schedule";
import { getAllProgramExercise, updateProgramExercise } from "../../fetching/program_exercise";
import { getExercise } from "../../fetching/exercise";
import { getAllWeek } from "../../fetching/week";
import { getAllCourse } from "../../fetching/course";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ArrowBack from '../../assets/back.png';

const EditProgram = () => {
    const { id } = useParams();
    const [program, setProgram] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [programExercise, setProgramExercise] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [weekList, setWeekList] = useState([]);
    const [course, setCourse] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const navigate = useNavigate();

    const fetchProgram = async () => {
        try {
            const program = await getProgrambyId(id);
            setProgram(program.data);
            setLoading(false);
            console.log("Program >>>", program.data);
            setName(program.data.name);
            setDescription(program.data.description);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSchedule = async () => {
        try {
            const schedule = await getAllSchedule("", "", "", "", id)
            setSchedule(schedule.data)
            setLoading(false)
            console.log("Jadwall >>>", schedule.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProgramExercise = async () => {
        try {
            const programExercise = await getAllProgramExercise("", 100, id, "")
            setProgramExercise(programExercise.data)
            setLoading(false)
            console.log("LISTTT >>>", programExercise.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchExercise = async () => {
        try {
            const exercise = await getExercise("", 1000, "", "", "")
            setExercise(exercise.data)
            console.log("Exercise >>> ", exercise.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchWeek = async () => {
        try {
            const weekList = await getAllWeek("", 1000, "")
            setWeekList(weekList.data)
            console.log("Week >>> ", weekList.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCourse = async () => {
        try {
            const course = await getAllCourse("", 1000, "", "")
            setCourse(course.data)
            console.log("Course >>> ", course.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        try {
            const payload = {
                name: name,
                description: description
            };
            const response = await updateProgram(id, payload);

            const selectedWeekId = getWeekIdByName(selectedWeek)
            console.log("DATA CIY >>", selectedWeekId)
            const selectedCourseId = getCourseIdByName(selectedCourse)
            console.log("JANCOK >>", selectedCourseId)

            const scheduleIds = schedule.map((item) => item.id);

            const payloadSchedule = {
                programId: id,
                weekId: getWeekIdByName(selectedWeek),
                courseId: getCourseIdByName(selectedCourse)
            }
            const scheduleResponse = await updateSchedule(scheduleIds, payloadSchedule)

            const updatedProgramExercisePromises = programExercise.map(async (item, index) => {
                const payload = {
                    programId: id,
                    exerciseId: getExerciseIdByName(selectedExercise[index])
                };
                console.log("Anjaiii", payload)
                const response = await updateProgramExercise(item.id, payload);
                return response;
            });

            await Promise.all(updatedProgramExercisePromises);

            // navigate("/program")
            toast.success('Program berhasil di update!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal update program');
        }
    };

    const handleClick = () => {
        navigate(`/program/${id}`);
    }


    const getExerciseIdByName = (exerciseName) => {
        const selectedExercise = exercise.data.find((cat) => cat.name === exerciseName);
        return selectedExercise ? selectedExercise.id : null;
    };

    const handleDropdownChange = (event, index) => {
        const selectedExerciseName = event.target.value;
        setSelectedExercise(prevState => {
            const newState = [...prevState];
            newState[index] = selectedExerciseName;
            return newState;
        });
        const selectedExerciseId = getExerciseIdByName(selectedExerciseName);
        console.log(`ID Gerakan yang Dipilih untuk programExercise[${index}]:`, selectedExerciseId);
    };


    const getWeekIdByName = (weekName) => {
        const selectedWeek = weekList.find((cat) => cat.name === weekName);
        return selectedWeek ? selectedWeek.id : null;
    };

    const handleDropdownWeekChange = (event) => {
        const selectedWeekName = event.target.value;
        setSelectedWeek(selectedWeekName);

        const selectedWeekId = getWeekIdByName(selectedWeekName);
        console.log("ID Week yang Dipilih:", selectedWeekId);
    };

    const getCourseIdByName = (courseName) => {
        const selectedCourse = course.find((cat) => cat.name === courseName);
        return selectedCourse ? selectedCourse.id : null;
    };

    const handleDropdownCourseChange = (event) => {
        const selectedCourseName = event.target.value;
        setSelectedCourse(selectedCourseName);

        const selectedCourseId = getCourseIdByName(selectedCourseName);
        console.log("ID Course yang Dipilih:", selectedCourseId);
    };

    useEffect(() => {
        setLoading(true);
        fetchProgram();
        fetchSchedule();
        fetchProgramExercise();
        fetchCourse();
        fetchWeek();
        fetchExercise();
    }, [id]);

    useEffect(() => {
        if (programExercise.length > 0) {
            setSelectedExercise(programExercise.map(item => item.Exercise.name));
        }
    }, [programExercise]);


    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 2xl:gap-8 justify-center items-center my-4 md:my-6 lg:my-8">
                <div className="flex justify-between items-center w-full px-2 lg:px-4 2xl:px-6">
                    <button className="p-2 md:p-2 lg:p-2 2xl:p-4 bg-white border border-b-2 border-red-500 rounded-md" onClick={handleClick}>
                        <span><img src={ArrowBack} alt="" className="w-4 h-4 mr-1" /></span>
                    </button>
                    <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Edit Program</h1>
                    <div></div>
                </div>
                <ToastContainer />
                {schedule.map((item) => (
                    <div className="w-full flex flex-col gap-2 justify-center items-center">
                        <select
                            value={selectedCourse}
                            onChange={handleDropdownCourseChange}
                            className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                        >
                            <option value="">{item.Course.name}</option>
                            {course.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedWeek}
                            onChange={handleDropdownWeekChange}
                            className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                        >
                            <option value="">{item.Week.name}</option>
                            {weekList.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                />
                <TextArea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi"
                />

                <ul className="w-full flex flex-col gap-2 justify-center items-center">
                    {programExercise.map((list, index) => (
                        <select
                            key={list.id}
                            value={selectedExercise[index]}
                            onChange={(e) => handleDropdownChange(e, index)}
                            className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                        >
                            <option value="">{list.Exercise.name}</option>
                            {exercise.data?.map((option) => (
                                <option key={option.id} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    ))}
                </ul>

                <div className="w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3">
                    <Button
                        onClick={handleUpdate}
                        text="Simpan"
                        border="border-[#006090]"
                        bg="bg-[#00A9FF]"
                        width="w-full"
                    />
                </div>
            </div>
        </>
    );
};

export default EditProgram;
