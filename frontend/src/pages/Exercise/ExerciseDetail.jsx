import { useState, useEffect } from "react"
import { getExerciseID, deleteExercise } from "../../fetching/exercise"
import { getAllExerciseCategory } from "../../fetching/exercise_category"
import { useNavigate, useParams } from "react-router-dom"
import Box from "../../components/Box"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import ArrowBack from '../../assets/back.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExerciseDetail = () => {
    const { id } = useParams()
    const [exercise, setExercise] = useState([])
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchExercise = async () => {
        try {
            const exercise = await getExerciseID(id)
            setExercise(exercise.data_exercise)
            setLoading(false)
            console.log("Exercise >>>", exercise.data_exercise)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCategory = async () => {
        try {
            const category = await getAllExerciseCategory("", 100, id, "")
            setCategory(category.data)
            console.log(category.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = () => {
        navigate(`/exercise/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await deleteExercise(id);
            navigate("/exercise");
            toast.success('Gerakan berhasil di hapus!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal menghapus gerakan');
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchExercise();
        fetchCategory();
    }, [id])

    const handleClick = () => {
        navigate(`/exercise`);
    }

    if (loading) {
        return <Loading />;
    }

    return <>
        <div className="flex flex-col gap-2 md:gap-2 lg:gap-4 2xl:gap-4 justify-center items-center my-4 md:my-6 lg:my-8 min-h-screen w-full">
            <div className="flex justify-between items-center w-full px-2 lg:px-4 2xl:px-6">
                <button className="p-2 md:p-2 lg:p-2 2xl:p-4 bg-white border border-b-2 border-red-500 rounded-md" onClick={handleClick}>
                    <span><img src={ArrowBack} alt="" className="w-4 h-4 mr-1" /></span>
                </button>
                <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Detail Gerakan</h1>
                <div></div>
            </div>
            <ToastContainer />
            <Box title="Nama" text={exercise.name} />
            <Box title="Deskripsi" text={exercise.description} />
            <Box title="Level" text={exercise.level} />
            <Box title="Timer" text={exercise.repetition_time} />
            <Box title="Repetisi Gerakan" text={exercise.repetition_value} />
            <Box title="Kalori" text={exercise.calories} />
            <Box title="Link Video" text={exercise.link} />
            <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Kategori</h1>
            {category.map((list) => (
                <div key={list.id} className="flex flex-col justify-between items-center w-full gap-2 md:gap-2 lg:gap-4 2xl:gap-4">
                    <div className="border p-2 bg-white border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3">
                        {list.Category.name}
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

export default ExerciseDetail