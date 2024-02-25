import { useState, useEffect } from "react";
import { getAllRecipe } from "../../fetching/recipe";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import RecipeBox from "../../components/RecipeBox";
import Title from "../../components/TitleBlue";
import Navbar from "../../components/Navbar";
import Paginate from "../../components/Paginate";
import Search from "../../components/Search";

const Recipe = () => {
    const [loading, setLoading] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchRecipe = async () => {
        try {
            const recipe = await getAllRecipe(currentPage, dataPerPage, searchTerm, "");
            setRecipe(recipe.data);
            setLoading(false);
            console.log("Recipe ======", recipe.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchRecipe();
    }, []);

    const handleDetailClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    const filteredRecipes = recipe.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            fetchRecipe()
        }
    }, [currentPage, dataPerPage, searchTerm]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <div className="p-2 md:p-4 lg:p-4 2xl:p-6 m-2 md:m-4 lg:m-4 2xl:m-6">
                <div className="flex justify-between items-center pb-4 2xl:pb-6">
                    <Title text="Resep" />
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
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
                    {filteredRecipes.map((item) => (
                        <div key={item.id} onClick={() => handleDetailClick(item.id)}>
                            <RecipeBox img={item.image_url} text={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Recipe;
