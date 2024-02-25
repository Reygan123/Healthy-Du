import { useState, useEffect } from "react";
import { getFoodById } from "../../fetching/food";
import { getUserLogin } from "../../fetching/user";
import { createFoodReport } from "../../fetching/food_report";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Calculator from "../../assets/calculator.png";
import Navbar from "../../components/Navbar";
import Info from "../../components/Info";
import BoxTitle from "../../components/BoxTitle";
import TextTitle from "../../components/TextTitle";

const FoodDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [food, setFood] = useState([]);
    const [inputGram, setInputGram] = useState(100);
    const [user, setUser] = useState();
    const [portionType, setPortionType] = useState("gram");
    const [portionCount, setPortionCount] = useState(1);

    const handlePortionCountChange = (e) => {
        const newPortionCount = parseInt(e.target.value, 10) || 0;
        setPortionCount(newPortionCount);
    };

    const navigate = useNavigate();

    const fetchFood = async () => {
        const food = await getFoodById(id);
        setFood(food.data);
        setLoading(false);
    };

    const fetchUser = async () => {
        const user = await getUserLogin();
        setUser(user.data);
        console.log("User>>>>>>>", user.data);
    };

    const handleGramChange = (e) => {
        const newGram = parseInt(e.target.value, 10) || 0;
        setInputGram(newGram);
    };

    const handlePortionTypeChange = (e) => {
        setPortionType(e.target.value);
        setInputGram(100); // Set default value back to 100 grams when changing portion type
    };

    const handleAddClick = async () => {
        try {
            const date = new Date().toISOString();

            const mealId = new URLSearchParams(location.search).get("meal_id");

            if (!mealId || isNaN(calculatedCalories)) {
                console.error("Invalid mealId or calculatedCalories");
                return;
            }

            await createFoodReport(
                user.id,
                food.id,
                mealId,
                date,
                calculatedCalories
            );
            console.log("Food added to report successfully!");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchFood();
        fetchUser();
    }, [id]);

    const calculateAmount = () => {
        switch (portionType) {
            case "gram":
                return inputGram * portionCount;
            case "bowl":
                return food.serving_bowl * portionCount;
            case "plate":
                return food.serving_plate * portionCount;
            case "piece":
                return food.piece * portionCount;
            case "buah":
                return food.piece * portionCount;
            case "butir":
                return food.piece * portionCount;
            default:
                return inputGram * portionCount;
        }
    };


    const calculatedCalories = (
        (calculateAmount() / food.serving_size) * food.calories
    ).toFixed(0);
    const calculatedFat = (
        (calculateAmount() / food.serving_size) * food.fat
    ).toFixed(2);
    const calculatedCarbohydrate = (
        (calculateAmount() / food.serving_size) * food.carbohydrate
    ).toFixed(2);
    const calculatedProtein = (
        (calculateAmount() / food.serving_size) * food.protein
    ).toFixed(2);
    const calculatedCholesterol = (
        (calculateAmount() / food.serving_size) * food.cholesterol
    ).toFixed(2);
    const calculatedSodium = (
        (calculateAmount() / food.serving_size) * food.sodium
    ).toFixed(2);
    const calculatedKalium = (
        (calculateAmount() / food.serving_size) * food.kalium
    ).toFixed(2);

    if (loading) {
        return <Loading />;
    }

    const mealId = new URLSearchParams(location.search).get("meal_id");
    const mealName = new URLSearchParams(location.search).get("meal_name");

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center my-4">
                <BoxTitle text={food.name} />
                <div>
                    <div className="flex justify-center gap-2 my-4 text-md">
                        <img src={Calculator} alt="" className="w-10 h-10" />
                        <input
                            type="number"
                            value={portionType === "gram" ? inputGram : portionCount}
                            onChange={
                                portionType === "gram" ? handleGramChange : handlePortionCountChange
                            }
                            placeholder={
                                portionType === "gram" ? "100 gram (g)" : "1"
                            }
                            className="font-bold border border-gray-300 px-4 py-2 md:px-16 lg:px-28 2xl:px-36 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg"
                        />
                        <select
                            value={portionType}
                            onChange={handlePortionTypeChange}
                            className="font-bold border border-gray-300 px-4 py-2 md:px-16 lg:px-28 2xl:px-36 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg"
                        >
                            <option value="gram">Gram</option>
                            <option value="bowl">Mangkok</option>
                            <option value="plate">Piring</option>
                            <option value="piece">Potong</option>
                            <option value="buah">Buah</option>
                            <option value="butir">Butir</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        onClick={handleAddClick}
                        className="w-full mb-4 py-2 text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md"
                    >
                        Tambah
                    </button>
                    <div className="grid grid-cols-2 gap-4 text-md">
                        <Info title="Kalori" subtitle={calculatedCalories} unit="kkal" />
                        <Info title="Lemak Total" subtitle={calculatedFat} unit="g" />
                        <Info
                            title="Total Karb"
                            subtitle={calculatedCarbohydrate}
                            unit="g"
                        />
                        <Info title="Protein" subtitle={calculatedProtein} unit="g" />
                    </div>
                    <TextTitle text="Informasi Gizi" />
                    <div className="flex justify-between bg-white border border-gray-300 rounded-md p-4">
                        <div className="text-gray-500 text-md">
                            <p>Porsi Ukuran</p>
                            <p>Kalori</p>
                            <p>Lemak</p>
                            <p>Kolestrol</p>
                            <p>Protein</p>
                            <p>Karbohidrat</p>
                            <p>Sodium</p>
                            <p>Kalium</p>
                        </div>
                        <div className="text-gray-500 text-right font-bold">
                            <p>
                                {calculateAmount()}{" "}
                                <span>
                                    {/* {portionType === "gram" ? "gram (g)" : portionType} */}
                                    gram
                                </span>
                            </p>

                            <p>{calculatedCalories}kkal</p>
                            <p>{calculatedFat}g</p>
                            <p>{calculatedCholesterol}mg</p>
                            <p>{calculatedProtein}mg</p>
                            <p>{calculatedCarbohydrate}g</p>
                            <p>{calculatedSodium}mg</p>
                            <p>{calculatedKalium}mg</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodDetail;
