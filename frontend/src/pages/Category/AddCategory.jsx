import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addCategory } from "../../fetching/category"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "../../components/Input"
import NavbarAdmin from "../../components/NavbarAdmin";

const AddCategory = () => {
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const payload = {
                name: name
            };
            const response = await addCategory(payload);
            console.log(response);
            navigate('/category')
            toast.success('Gerakan berhasil di tambah!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal tambah gerakan');
        }
    };

    return <>
        <NavbarAdmin />
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-6 2xl:gap-6 justify-center items-center my-8 min-h-screen">
            <h1 className="my-4 text-xl sm:text-xl md:text-xl lg:text-2xl 2xl:text-2xl font-extrabold">Tambah Gerakan</h1>
            <ToastContainer />
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama" />
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

export default AddCategory