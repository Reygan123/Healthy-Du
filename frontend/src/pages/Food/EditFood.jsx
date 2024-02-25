import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getFoodById, updateFood } from "../../fetching/food";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ArrowBack from '../../assets/back.png';

const EditFood = () => {
    const { id } = useParams();
    const [food, setFood] = useState({});
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [servingSize, setServingSize] = useState(0);
    const [calories, setCalories] = useState(0);
    const [servingPlate, setServingPlate] = useState(0);
    const [servingBowl, setServingBowl] = useState(0);
    const [servingPiece, setServingPiece] = useState(0);
    const [carbohydrate, setCarbohydrate] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    const [cholesterol, setCholesterol] = useState(0);
    const [sodium, setSodium] = useState(0);
    const [kalium, setKalium] = useState(0);
    const navigate = useNavigate();

    const fetchFood = async () => {
        try {
            const food = await getFoodById(id);
            setFood(food.data);
            setLoading(false);
            console.log("Makanan >>>", food.data);
            setName(food.data.name);
            setServingSize(food.data.serving_size)
            setCalories(food.data.calories);
            setServingPlate(food.data.serving_plate)
            setServingBowl(food.data.serving_bowl)
            setServingPiece(food.data.piece)
            setCarbohydrate(food.data.carbohydrate);
            setProtein(food.data.protein);
            setFat(food.data.fat);
            setCholesterol(food.data.cholesterol);
            setSodium(food.data.sodium);
            setKalium(food.data.kalium);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async () => {
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
            const response = await updateFood(id, payload);
            navigate("/admin/food")
            toast.success('Makanan berhasil di update!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal update Makanan');
        }
    };

    const handleClick = () => {
        navigate(`/admin/food/${id}`);
    }

    useEffect(() => {
        setLoading(true);
        fetchFood();
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
                    <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Edit Makanan</h1>
                    <div></div>
                </div>
                <ToastContainer />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Nama</h1>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Takaran</h1>
                <Input
                    type="text"
                    value={servingSize}
                    onChange={(e) => setServingSize(e.target.value)}
                    placeholder="100g"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Kalori</h1>
                <Input
                    type="text"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="kalori"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Takaran per Piring</h1>
                <Input
                    type="text"
                    value={servingPlate}
                    onChange={(e) => setServingPlate(e.target.value)}
                    placeholder="Takaran per Piring"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Takaran per Mangkok</h1>
                <Input
                    type="text"
                    value={servingBowl}
                    onChange={(e) => setServingBowl(e.target.value)}
                    placeholder="Takaran per Mangkok"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Takaran per Potong</h1>
                <Input
                    type="text"
                    value={servingPiece}
                    onChange={(e) => setServingPiece(e.target.value)}
                    placeholder="Takaran per Potong"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Karbohidrat</h1>
                <Input
                    type="text"
                    value={carbohydrate}
                    onChange={(e) => setCarbohydrate(e.target.value)}
                    placeholder="Karbohidrat"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Kolestrol</h1>
                <Input
                    type="text"
                    value={cholesterol}
                    onChange={(e) => setCholesterol(e.target.value)}
                    placeholder="Kolestrol"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Protein</h1>
                <Input
                    type="text"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    placeholder="Protein"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Lemak</h1>
                <Input
                    type="text"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    placeholder="Lemak"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Sodium</h1>
                <Input
                    type="text"
                    value={sodium}
                    onChange={(e) => setSodium(e.target.value)}
                    placeholder="Sodium"
                />
                <h1 className="text-left text-sm md:text-md lg:text-md 2xl:text-lg font-bold">Kalium</h1>
                <Input
                    type="text"
                    value={kalium}
                    onChange={(e) => setKalium(e.target.value)}
                    placeholder="Kalium"
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

export default EditFood;
