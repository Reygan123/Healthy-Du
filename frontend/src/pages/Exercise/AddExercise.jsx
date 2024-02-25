import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addExercise } from "../../fetching/exercise"
import { getAllCategory } from "../../fetching/category"
import { createExerciseCategory } from "../../fetching/exercise_category"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "../../components/Input"
import TextArea from "../../components/TextArea"

const AddExercise = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [repetition_time, setRepetition_time] = useState('')
    const [repetition_value, setRepetition_value] = useState('')
    const [level, setLevel] = useState("")
    const [calories, setCalories] = useState('')
    const [link, setLink] = useState("")
    const [category, setCategory] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const options = ['easy', 'medium', 'hard'];
    const navigate = useNavigate()

    console.log("LEVEL>>>>>>>>", level);

    const handleSubmit = async () => {
        try {

            const payload = {
                name: name,
                description: description,
                repetition_time: repetition_time,
                repetition_value: repetition_value,
                level: level,
                calories: calories,
                link: link
            };
            const response = await addExercise(payload);
            console.log(response);

            const exerciseId = response.data.id;

            // Membuat payload untuk setiap kategori yang dipilih
            const categoryPayloads = selectedCategories.map((selectedCategory) => ({
                exerciseId: exerciseId,
                categoryId: selectedCategory.id
            }));

            // Menambahkan kategori latihan untuk setiap payload
            const categoryResponses = await Promise.all(categoryPayloads.map(createExerciseCategory));
            console.log("Responses Categories:", categoryResponses);
            navigate('/exercise')
            toast.success('Gerakan berhasil di tambah!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal tambah gerakan');
        }
    };

    const fetchCategory = async () => {
        try {
            const category = await getAllCategory("", "", "")
            setCategory(category.data)
            console.log("Kategori >>> ", category.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleChange = (event) => {
        setLevel(event.target.value);
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const getCategoryIdByName = (categoryName) => {
        const selectedCategory = category.find((cat) => cat.name === categoryName);
        return selectedCategory ? selectedCategory.id : null;
    };

    const handleAddCategory = () => {
        if (selectedValue.trim() !== "") {
            const selectedCategoryId = getCategoryIdByName(selectedValue);
            if (selectedCategoryId !== null) {
                // Menambah kategori ke dalam array selectedCategories
                setSelectedCategories([...selectedCategories, { id: selectedCategoryId, name: selectedValue }]);
            }
            setSelectedValue(""); // Reset nilai selectedValue setelah menambah kategori
        }
    };

    const handleDropdownChange = (event) => {
        const selectedCategoryName = event.target.value;
        setSelectedValue(selectedCategoryName);

        const selectedCategoryId = getCategoryIdByName(selectedCategoryName);
        console.log("ID Kategori yang Dipilih:", selectedCategoryId);
    };

    return <>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-6 2xl:gap-6 justify-center items-center my-8 min-h-screen">
            <h1 className="my-4 text-xl sm:text-xl md:text-xl lg:text-2xl 2xl:text-2xl font-extrabold">Tambah Gerakan</h1>
            <ToastContainer />
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama" />
            <TextArea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi" />
            <select value={level} onChange={handleChange} className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500">
                <option value="">Tingkat Kesulitan...</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <Input type="text" value={repetition_time} onChange={(e) => setRepetition_time(e.target.value)} placeholder="Timer Gerakan" />
            <Input type="text" value={repetition_value} onChange={(e) => setRepetition_value(e.target.value)} placeholder="Repetisi Gerakan" />
            <Input type="text" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Kalori yang dibakar" />
            <Input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Masukan Link Youtube" />
            <button
                type="button"
                onClick={handleAddCategory}
                className="w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 mt-4 py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-white font-bold border-b-4 border-green-600 bg-green-400 rounded-md"
            >
                Tambah Kategori
            </button>

            <select
                value={selectedValue}
                onChange={handleDropdownChange}
                className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
            >
                <option value="">Pilih Kategori...</option>
                {category.map((option) => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>

            <ul className="w-full flex flex-col gap-2 justify-center items-center">
                {selectedCategories.map((selectedCategory) => (
                    <div className="text-sm md:text-md lg:text-md 2xl:text-lg px-4 py-2 rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 bg-white border-2 border-sky-500" key={selectedCategory.id}>{selectedCategory.name}</div>
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

export default AddExercise