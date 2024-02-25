import { useState } from "react"
import { addCourse } from "../../fetching/course"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "../../components/Input"
import TextArea from "../../components/TextArea"

const AddCourse = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const payload = {
                name: name,
                description: description,
            }
            const response = await addCourse(payload)
            console.log(response)
            navigate('/admin/course')
            toast.success('Course berhasil di tambah!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal tambah course');
        }
    }

    return <>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-6 2xl:gap-6 justify-center items-center my-8 min-h-screen">
            <h1 className="my-4 text-xl sm:text-xl md:text-xl lg:text-2xl 2xl:text-2xl font-extrabold">Tambah Course</h1>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama" />
            <TextArea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi" />
            <button type="submit" onClick={handleSubmit} className="w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 mt-4 py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Submit</button>
        </div>
    </>
}

export default AddCourse