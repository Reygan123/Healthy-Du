import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCategorybyId, updateCategory } from "../../fetching/category";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ArrowBack from '../../assets/back.png';

const EditCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchCategory = async () => {
        try {
            const exerciseData = await getCategorybyId(id);
            setCategory(exerciseData.data);
            setLoading(false);
            console.log("Kategori >>>", exerciseData.data);
            setName(exerciseData.data.name);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                name: name
            };
            const response = await updateCategory(id, payload);
            navigate("/category")
            console.log("Exercise updated successfully!", response);
            toast.success('Kategori berhasil di update!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal update kategori');
        }
    };

    const handleClick = () => {
        navigate(`/category/${id}`);
    }

    useEffect(() => {
        setLoading(true);
        fetchCategory();
    }, [id]);

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
                    <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Edit Kategori</h1>
                    <div></div>
                </div>
                <ToastContainer />
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                />
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

export default EditCategory;
