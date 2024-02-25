import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getAllFood } from "../../fetching/food";
import Loading from "../../components/Loading";
import Title from "../../components/TitleBlue";
import Navbar from "../../components/Navbar";
import Paginate from "../../components/Paginate";

const Food = () => {
    const [foodData, setFoodData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();


    const fetchFood = async () => {
        try {
            const foodDataResponse = await getAllFood(currentPage, dataPerPage, searchTerm, "");
            setFoodData(foodDataResponse.data);
            setLoading(false);
            console.log("Food Data >>>>>>>", foodDataResponse);
        } catch (error) {
            console.log(error);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDataPage = async (e) => {
        setDataPerPage(+e.target.value)
    }

    useEffect(() => {
        if (searchTerm.length >= 3 || searchTerm.length === 0) {
            setLoading(false);
            fetchFood();
        }
    }, [currentPage, dataPerPage, searchTerm]);

    useEffect(() => {
        setLoading(true);
        fetchFood();
    }, []);

    const mealId = new URLSearchParams(location.search).get("mealId");
    const mealName = new URLSearchParams(location.search).get("mealName");

    const handleDetailClick = (id) => {
        navigate(`/food/${id}?meal_id=${mealId}&meal_name=${encodeURIComponent(mealName)}`);
    };


    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <div className="m-4">
                <div className="flex justify-between items-center pb-4 2xl:pb-6">
                    <Title text="Makanan" />
                    <Title text={mealName} />
                    <div className="hidden justify-between items-center my-2 gap-2 md:flex lg:flex 2xl:flex">
                        <div>
                            <select
                                className="text-xs md:text-md lg:text-md 2xl:text-lg px-2 py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 2xl:px-4 2xl:py-4 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
                                placeholder="Data Page"
                                onChange={handleDataPage}
                                value={dataPerPage}
                            >
                                <option value={5}><span><p> 5 </p></span></option>
                                <option value={10}><span><p>10 </p></span></option>
                                <option value={15}><span><p>15 </p></span></option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-[#BFBFBF] py-2 md:py-2 lg:py-2 2xl:py-4 text-xs md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center my-2 gap-2 md:hidden lg:hidden 2xl:hidden">
                    <div>
                        <select
                            className="text-xs md:text-md lg:text-md 2xl:text-lg px-2 py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 2xl:px-4 2xl:py-4 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
                            placeholder="Data Page"
                            onChange={handleDataPage}
                            value={dataPerPage}
                        >
                            <option value={5}><span><p> 5 </p></span></option>
                            <option value={10}><span><p>10 </p></span></option>
                            <option value={15}><span><p>15 </p></span></option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-[#BFBFBF] py-2 md:py-2 lg:py-2 2xl:py-4 text-xs md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                        />
                    </div>
                </div>
                <table className="bg-white border-2 border-gray-300 w-full text-center 2xl:rounded-lg">
                    <thead>
                        <tr >
                            <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Nama</th>
                            <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Kalori</th>
                            <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodData.map((food) => (
                            <tr key={food.id}>
                                <td className="py-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{food.name}</td>
                                <td className="py-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{food.calories}</td>
                                <td className="py-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl"><button className="px-6 py-1 my-1 rounded-md md:px-4 md:py-2 lg:px-4 lg:py-2 2xl:px-4 2xl:py-2 border-2 border-[#BFBFBF] 2xl:rounded-lg" onClick={() => handleDetailClick(food.id)}>Detail</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 text-sm md:text-md lg:text-md 2xl:text-lg">
                    <Paginate totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} paginate={paginate} />
                </div>
            </div>
        </>
    );
};

export default Food;
