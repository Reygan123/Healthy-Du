import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addFood } from "../../fetching/food";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "../../components/Input"

const AddFood = () => {
    const [name, setName] = useState("");
    const [servingSize, setServingSize] = useState(100);
    const [calories, setCalories] = useState('');
    const [servingPlate, setServingPlate] = useState('');
    const [servingBowl, setServingBowl] = useState('');
    const [servingPiece, setServingPiece] = useState('');
    const [carbohydrate, setCarbohydrate] = useState('');
    const [fat, setFat] = useState('');
    const [protein, setProtein] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [sodium, setSodium] = useState('');
    const [kalium, setKalium] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const payload = {
                name: name,
                serving_size: servingSize,
                calories: calories,
                serving_plate: servingPlate,
                serving_bowl: servingBowl,
                piece: servingPiece,
                carbohydrate: carbohydrate,
                protein: protein,
                cholesterol: cholesterol,
                fat: fat,
                sodium: sodium,
                kalium: kalium
            };
            const response = await addFood(payload);
            console.log(response);
            navigate('/admin/food')
            toast.success('Makanan berhasil di tambah!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal tambah Makanan');
        }
    };

    return <>
        <div className="flex flex-col justify-center items-center my-8 min-h-screen w-full">
            <h1 className="my-4 text-xl sm:text-xl md:text-xl lg:text-2xl 2xl:text-4xl font-extrabold">Tambah Makanan</h1>
            <ToastContainer />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Nama</p>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Takaran 100 gram</p>
            <Input type="text" value={servingSize} onChange={(e) => setServingSize(e.target.value)} placeholder="Masukan Takaran (100)gr" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Kalori Takaran </p>
            <Input type="text" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Masukan Kalori Takaran" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Takaran per Piring </p>
            <Input type="text" value={servingPlate} onChange={(e) => setServingPlate(e.target.value)} placeholder="Masukan Takaran Per Piring" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Takaran per Mangkok </p>
            <Input type="text" value={servingBowl} onChange={(e) => setServingBowl(e.target.value)} placeholder="Masukan Takaran Per Mangkok" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Takaran per Mangkok </p>
            <Input type="text" value={servingPiece} onChange={(e) => setServingPiece(e.target.value)} placeholder="Masukan Takaran Per Potong" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Karbohidrat </p>
            <Input type="text" value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} placeholder="Karbohidrat" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Lemak </p>
            <Input type="text" value={fat} onChange={(e) => setFat(e.target.value)} placeholder="Lemak" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Protein </p>
            <Input type="text" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="Protein" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Kolesterol </p>
            <Input type="text" value={cholesterol} onChange={(e) => setCholesterol(e.target.value)} placeholder="Kolesterol" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Sodium </p>
            <Input type="text" value={sodium} onChange={(e) => setSodium(e.target.value)} placeholder="Sodium" />
            <p className="font-bold text-sm md:text-md lg:text-md 2xl:text-lg mt-4">Kalium </p>
            <Input type="text" value={kalium} onChange={(e) => setKalium(e.target.value)} placeholder="Kalium" />
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

export default AddFood