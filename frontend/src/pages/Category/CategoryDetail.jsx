import { useState, useEffect } from "react"
import { getCategorybyId, deleteCategory } from "../../fetching/category"
import { useNavigate, useParams } from "react-router-dom"
import Box from "../../components/Box"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import ArrowBack from '../../assets/back.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryDetail = () => {
    const { id } = useParams()
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchCategory = async () => {
        try {
            const category = await getCategorybyId(id)
            setCategory(category.data)
            setLoading(false)
            console.log("Kategori >>>", category.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = () => {
        navigate(`/category/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await deleteCategory(id);
            navigate("/category");
            toast.success('Kategori berhasil di hapus!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal menghapus kategori');
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCategory();
    }, [id])

    const handleClick = () => {
        navigate(`/category`);
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
                <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Detail Kategori</h1>
                <div></div>
            </div>
            <ToastContainer />
            <Box title="Nama" text={category.name} />
            <div className="flex mt-4 w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 items-center justify-center gap-2 md:gap-2 lg:gap-4 2xl:gap-4">
                <Button onClick={handleEditClick} text="Ubah" border="border-[#006090]" bg="bg-[#00A9FF]" width="w-1/2" />
                <Button onClick={handleDelete} text="Hapus" border="border-red-700" bg="bg-red-500" width="w-1/2" />
            </div>
        </div>
    </>

}

export default CategoryDetail