import { useState, useEffect } from "react"
import { getProgrambyId, deleteProgram } from "../../fetching/program"
import { getAllSchedule } from "../../fetching/schedule"
import { getAllProgramExercise } from "../../fetching/program_exercise"
import { useNavigate, useParams } from "react-router-dom"
import Box from "../../components/Box"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import ArrowBack from '../../assets/back.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarAdmin from "../../components/NavbarAdmin"

const ProgramDetail = () => {
    const { id } = useParams()
    const [program, setProgram] = useState([])
    const [schedule, setSchedule] = useState([])
    const [exercise, setExercise] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchProgram = async () => {
        try {
            const program = await getProgrambyId(id)
            setProgram(program.data)
            setLoading(false)
            console.log("Program >>>", program.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSchedule = async () => {
        try {
            const schedule = await getAllSchedule("", 100, "", "", id)
            setSchedule(schedule.data)
            setLoading(false)
            console.log("Jadwall >>>", schedule.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProgramExercise = async () => {
        try {
            const exercise = await getAllProgramExercise("", 100, id, "")
            setExercise(exercise.data)
            setLoading(false)
            console.log("LISTTT >>>", exercise.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = () => {
        navigate(`/program/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await deleteProgram(id);
            navigate("/program");
            toast.success('Program berhasil di hapus!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal menghapus program');
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchProgram();
        fetchSchedule();
        fetchProgramExercise();
    }, [id])

    const handleClick = () => {
        navigate(`/program`);
    }

    if (loading) {
        return <Loading />;
    }

    return <>
        <div className="flex flex-col gap-2 md:gap-2 lg:gap-4 2xl:gap-4 justify-center items-center my-4 md:my-6 lg:my-8 w-full">
            <div className="flex justify-between items-center w-full px-2 lg:px-4 2xl:px-6">
                <button className="p-2 md:p-2 lg:p-2 2xl:p-4 bg-white border border-b-2 border-red-500 rounded-md" onClick={handleClick}>
                    <span><img src={ArrowBack} alt="" className="w-4 h-4 mr-1" /></span>
                </button>
                <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Detail Program</h1>
                <div></div>
            </div>
            <ToastContainer />
            {schedule.map((item) => (
                <div key={item.id} className="flex flex-col justify-between items-center w-full gap-2 md:gap-2 lg:gap-4 2xl:gap-4">
                    <Box title="Nama Course" text={item.Course.name} />
                    <Box title="Minggu" text={item.Week.name} />
                </div>
            ))}
            <Box title="Nama" text={program.name} />
            <Box title="Deskripsi" text={program.description} />
            <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">List Gerakan</h1>
            {exercise.map((list) => (
                <div key={list.id} className="flex flex-col justify-between items-center w-full gap-2 md:gap-2 lg:gap-4 2xl:gap-4">
                    <div className="border p-2 bg-white border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3">
                        {list.Exercise.name}
                    </div>
                </div>
            ))}
            <div className="flex mt-4 w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 items-center justify-center gap-2 md:gap-2 lg:gap-4 2xl:gap-4">
                <Button onClick={handleEditClick} text="Ubah" border="border-[#006090]" bg="bg-[#00A9FF]" width="w-1/2" />
                <Button onClick={handleDelete} text="Hapus" border="border-red-700" bg="bg-red-500" width="w-1/2" />
            </div>
        </div>
    </>

}

export default ProgramDetail