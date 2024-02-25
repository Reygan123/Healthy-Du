import { useState, useEffect } from "react"
import { getFoodById, deleteFood } from "../../fetching/food"
import { useNavigate, useParams } from "react-router-dom"
import Box from "../../components/Box"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import ArrowBack from '../../assets/back.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodDetailbyID = () => {
    const { id } = useParams()
    const [food, setFood] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchFood = async () => {
        try {
            const food = await getFoodById(id)
            setFood(food.data)
            setLoading(false)
            console.log("Kategori >>>", food.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = () => {
        navigate(`/admin/food/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await deleteFood(id);
            navigate("/admin/food");
            toast.success('makanan berhasil di hapus!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal menghapus makanan');
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchFood();
    }, [id])

    const handleClick = () => {
        navigate(`/admin/food`);
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
                <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Detail Makanan</h1>
                <div></div>
            </div>
            <ToastContainer />
            <Box title="Nama" text={food.name} />
            <Box title="Takaran" text={food.serving_size} />
            <Box title="Kalori" text={food.calories} />
            <Box title="Takaran Per Piring" text={food.serving_plate} />
            <Box title="Takaran Per Mangkok" text={food.serving_bowl} />
            <Box title="Takaran Per Potong" text={food.piece} />
            <Box title="Kolestrol" text={food.cholesterol} />
            <Box title="Karbohidrat" text={food.carbohydrate} />
            <Box title="Protein" text={food.protein} />
            <Box title="Lemak" text={food.fat} />
            <Box title="Sodium" text={food.sodium} />
            <Box title="Kalium" text={food.kalium} />
            {/* <p>{calculatedCalories}kkal</p>
            <p>{calculatedFat}g</p>
            <p>{calculatedCholesterol}mg</p>
            <p>{calculatedProtein}mg</p>
            <p>{calculatedCarbohydrate}g</p>
            <p>{calculatedSodium}mg</p>
            <p>{calculatedKalium}mg</p>
            <p>{portionType}</p> */}
            <div className="flex mt-4 w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 items-center justify-center gap-2 md:gap-2 lg:gap-4 2xl:gap-4">
                <Button onClick={handleEditClick} text="Ubah" border="border-[#006090]" bg="bg-[#00A9FF]" width="w-1/2" />
                <Button onClick={handleDelete} text="Hapus" border="border-red-700" bg="bg-red-500" width="w-1/2" />
            </div>
        </div>
    </>

}

export default FoodDetailbyID