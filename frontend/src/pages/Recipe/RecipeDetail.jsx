import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import { deleteRecipe, getRecipebyId } from "../../fetching/recipe";
import Info from "../../components/Info";
import BoxTitle from "../../components/BoxTitle";
import TextTitle from "../../components/TextTitle";
import LongBox from "../../components/LongBox";
import Navbar from "../../components/Navbar";
import IconBack from "../../components/IconBack";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../components/Button"


const RecipeDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState([])
    const [recipe, setRecipe] = useState([])

    const fetchRecipeDetail = async () => {
        try {
            const recipe = await getRecipebyId(id)
            setRecipe(recipe.data)
            console.log("Recipe >>>>>> ", recipe.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = () => {
        navigate(`/admin/recipe/edit/${id}`);
    };


    useEffect(() => {
        fetchRecipeDetail();
        setLoading(true)
    }, [])

    if (loading) {
        return <Loading />
    }
    const handleDelete = async () => {
        try {
            await deleteRecipe(id);
            navigate("/admin/recipe");
            toast.success('resep berhasil di hapus!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal menghapus resep');
        }
    };

    const handleClick = () => {
        navigate(`/admin/recipe`);
    }

    return <>
        <Navbar />
        <div className="w-full p-4 md:px-8 lg:px-10 2xl:px-14">
            <div className="flex justify-between items-start">
                <IconBack to="/admin/recipe" />
                <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="w-24 border border-gray-400 rounded-md">
                        <img src={recipe.image_url} alt="" className="rounded-md" />
                    </div>
                    <div className="w-fit hidden md:flex lg:flex 2xl:flex">
                        <BoxTitle text={recipe.name} />
                    </div>
                </div>
                <div></div>
            </div>
            <div className="w-full my-4 flex justify-center items-center md:hidden lg:hidden 2xl:hidden">
                <div className="w-fit"><BoxTitle text={recipe.name} /></div>
            </div>
            <div className="flex justify-center gap-4 my-4 lg:my-4 2xl:my-8">
                <Info title="Waktu Persiapan" subtitle={recipe.time_prepare} unit=" Menit" />
                <Info title="Waktu Memasak" subtitle={recipe.time_cooking} unit=" Menit" />
            </div>
            <TextTitle text="Bahan-Bahan" />
            <LongBox text={recipe.description} />
            <TextTitle text="Cara Memasak" />
            <LongBox text={recipe.tutorial} />
            <div className="w-full justify-center items-center flex">

                <div className="flex mt-4 w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 items-center justify-center gap-2 md:gap-2 lg:gap-4 2xl:gap-4">
                    <Button onClick={handleEditClick} text="Ubah" border="border-[#006090]" bg="bg-[#00A9FF]" width="w-1/2" />
                    <Button onClick={handleDelete} text="Hapus" border="border-red-700" bg="bg-red-500" width="w-1/2" />
                </div>
            </div>
        </div>
    </>
}

export default RecipeDetail