import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addProgram } from "../../fetching/program"
import { getExercise } from "../../fetching/exercise"
import { getAllWeek } from "../../fetching/week"
import { getAllCourse } from "../../fetching/course"
import { createSchedule } from "../../fetching/schedule"
import { createProgramExercise } from "../../fetching/program_exercise"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "../../components/Input"
import TextArea from "../../components/TextArea"

const AddProgram = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [exercise, setExercise] = useState([])
    const [week, setWeek] = useState([])
    const [course, setCourse] = useState([])
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const payload = {
                name: name,
                description: description
            };
            const response = await addProgram(payload);
            console.log(response);

            const programId = response.id;

            const exercisePayloads = selectedExercises.map((selectedExercise) => ({
                programId: programId,
                exerciseId: selectedExercise.id
            }));

            const categoryResponses = await Promise.all(exercisePayloads.map(createProgramExercise));
            console.log("Responses Categories:", categoryResponses);

            const selectedWeekID = getWeekIdByName(selectedWeek)
            console.log("DATA COYY >>>", selectedWeekID)

            const selectedCourseID = getCourseIdByName(selectedCourse)
            console.log("COYY >>>", selectedCourseID)

            const payloadSchedule = {
                courseId: selectedCourseID,
                weekId: selectedWeekID,
                programId: response.id
            }
            const responseSchedule = await createSchedule(payloadSchedule)
            console.log("Jadwal >>>>", responseSchedule)
            navigate('/program')
            toast.success('Program berhasil di tambah!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal tambah program');
        }
    };

    const fetchExercise = async () => {
        try {
            const exercise = await getExercise("", 1000, "", "", "")
            setExercise(exercise.data)
            console.log("Kategori >>> ", exercise.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchWeek = async () => {
        try {
            const week = await getAllWeek("", 1000, "")
            setWeek(week.data)
            console.log("Week >>> ", week.data)
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

    useEffect(() => {
        fetchExercise()
        fetchWeek()
        fetchCourse()
    }, [])

    const getExerciseIdByName = (exerciseName) => {
        const selectedExercise = exercise.data?.find((cat) => cat.name === exerciseName);
        return selectedExercise ? selectedExercise.id : null;
    };

    const handleAddCategory = () => {
        if (selectedValue.trim() !== "") {
            const selectedCategoryId = getExerciseIdByName(selectedValue);
            if (selectedCategoryId !== null) {
                setSelectedExercises([...selectedExercises, { id: selectedCategoryId, name: selectedValue }]);
            }
            setSelectedValue("");
        }
    };

    const handleDropdownChange = (event) => {
        const selectedExerciseName = event.target.value;
        setSelectedValue(selectedExerciseName);

        const selectedExerciseId = getExerciseIdByName(selectedExerciseName);
        console.log("ID Gerakan yang Dipilih:", selectedExerciseId);
    };

    const getWeekIdByName = (weekName) => {
        const selectedWeek = week.find((cat) => cat.name === weekName);
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

    return <>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-6 2xl:gap-6 justify-center items-center my-8 min-h-screen">
            <h1 className="my-4 text-xl sm:text-xl md:text-xl lg:text-2xl 2xl:text-2xl font-extrabold">Tambah Program</h1>
            <ToastContainer />
            <select
                value={selectedCourse}
                onChange={handleDropdownCourseChange}
                className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
            >
                <option value="">Pilih Course...</option>
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
                <option value="">Pilih Minggu...</option>
                {week.map((item) => (
                    <option key={item.id} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama" />
            <TextArea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi" />
            <button
                type="button"
                onClick={handleAddCategory}
                className="w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 mt-4 py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-white font-bold border-b-4 border-green-600 bg-green-400 rounded-md"
            >
                Tambah Gerakan
            </button>

            <select
                value={selectedValue}
                onChange={handleDropdownChange}
                className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
            >
                <option value="">Pilih Gerakan...</option>
                {exercise.data?.map((option) => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>

            <ul className="w-full flex flex-col gap-2 justify-center items-center">
                {selectedExercises.map((selectedExercise) => (
                    <div className="text-sm md:text-md lg:text-md 2xl:text-lg px-4 py-2 rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 bg-white border-2 border-sky-500" key={selectedExercise.id}>{selectedExercise.name}</div>
                ))}
            </ul>

            <button
                type="submit"
                onClick={handleSubmit}
                className="w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 mt-4 py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md"
            >
                Simpan
            </button>
        </div>
    </>
}

export default AddProgram