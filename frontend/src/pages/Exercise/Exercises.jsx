import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getExercise } from "../../fetching/exercise"
import Loading from "../../components/Loading"
import Title from "../../components/TitleBlue"
import Excel from "../../assets/icon/xls.png"
import * as XLSX from "xlsx";
import Navbar from "../../components/Navbar"
import Paginate from "../../components/Paginate"
import Button from "../../components/Button"
import NavbarAdmin from "../../components/NavbarAdmin"

const Exercise = () => {
    const [exercise, setExercise] = useState([])
    const [exerciseFull, setExerciseFull] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const navigate = useNavigate()

    const fetchExercise = async () => {
        try {
            // console.log("Fetching exercises with level:", selectedLevel);
            const exercise = await getExercise(currentPage, dataPerPage, searchTerm, selectedLevel, "");
            setExercise(exercise.data);
            setTotalPages(Math.ceil(exercise.data.totalItems / dataPerPage));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExerciseFull = async () => {
        try {
            const exerciseFull = await getExercise("", 1000, "", "", "");
            setExerciseFull(exerciseFull.data);
            console.log("LOLLL>", exerciseFull.data);
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
            fetchExercise();
        }
    }, [currentPage, dataPerPage, searchTerm, selectedLevel]);

    useEffect(() => {
        fetchExerciseFull()
    }, [])

    const handleDetailClick = (id) => {
        navigate(`/exercise/${id}`);
    };

    const exportToExcel = () => {
        const columnsToExport = ['name', 'description', 'repetition_value', 'repetition_time', 'level', 'calories', 'link'];
        const worksheet = XLSX.utils.json_to_sheet(
            exerciseFull.data?.map((item) =>
                columnsToExport.reduce((acc, key) => {
                    acc[key] = item[key];
                    return acc;
                }, {})
            )
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ExerciseData');
        XLSX.writeFile(workbook, 'list_gerakan.xlsx');
    };

    const handleClick = () => {
        navigate(`/exercise/add`);
    }

    if (loading) {
        return <Loading />;
    }

    return <>
        <NavbarAdmin />
        <div className="m-4">
            <div className="flex justify-between items-center pb-4 2xl:pb-6">
                <Title text="List Gerakan" />
                <div className="justify-center items-center gap-2 hidden md:flex lg:flex 2xl:flex">
                    <div>
                        <button
                            className="py-2 px-2 md:px-2 lg:px-2 2xl:py-5 2xl:px-5 bg-white border-2 border-b-4 lg:border-b-[6px] border-green-600 rounded-md 2xl:rounded-lg"
                            onClick={exportToExcel}
                        >
                            <span><img src={Excel} className="w-6 lg:w-8" /></span>
                        </button>
                    </div>
                    <div>
                        <select
                            className="text-xs md:text-md lg:text-md 2xl:text-lg px-2 py-1 md:px-4 md:py-3 lg:px-4 lg:py-2 2xl:px-4 2xl:py-4 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
                            placeholder="Data Page"
                            onChange={handleDataPage}
                            value={dataPerPage}
                        >
                            <option value={5}><span><p> 5 </p></span></option>
                            <option value={10}><span> <p>10 </p></span></option>
                            <option value={15}><span> <p>15 </p></span></option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-[#BFBFBF] py-1 md:py-3 lg:py-2 2xl:py-4 text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-3/4 lg:w-3/4 2xl:w-3/4 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                        />
                        <select
                            className="ml-2 text-sm md:text-md lg:text-md 2xl:text-lg px-2 py-1 md:px-4 md:py-3 lg:px-4 lg:py-2 2xl:px-4 2xl:py-4 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
                            placeholder="Filter by Level"
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            value={selectedLevel}
                        >
                            <option value="">All</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <Button onClick={handleClick} text="Tambah Latihan" border="border-sky-700" bg="bg-sky-500" width="w-1/2 md:w-2/6 lg:w-1/4 2xl:w-2/6" />
                </div>
                <div className="flex flex-col md:hidden lg:hidden 2xl:hidden mx-1">
                    <Button onClick={handleClick} text="Tambah Latihan" border="border-sky-700" bg="bg-sky-500" width="px-3" />
                </div>
                <div className="flex flex-col md:hidden lg:hidden 2xl:hidden">
                    <button
                        className="py-2 px-2 md:px-2 lg:px-2 2xl:py-5 2xl:px-5 bg-white border-2 border-b-4 lg:border-b-[6px] border-green-600 rounded-md 2xl:rounded-lg"
                        onClick={exportToExcel}
                    >
                        <span><img src={Excel} className="w-6 lg:w-8" /></span>
                    </button>
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
                        className="border border-[#BFBFBF] py-2 md:py-2 lg:py-2 2xl:py-4 text-xs md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-3/4 lg:w-3/4 2xl:w-3/4 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                    />
                    <select
                        className="ml-2 text-xs md:text-md lg:text-md 2xl:text-lg px-2 py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 2xl:px-4 2xl:py-4 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
                        placeholder="Filter by Level"
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        value={selectedLevel}
                    >
                        <option value=""><span><p>All</p></span></option>
                        <option value="easy"><span><p>Easy</p></span></option>
                        <option value="medium"><span><p>Medium</p></span></option>
                        <option value="hard"><span><p>Hard</p></span></option>
                    </select>
                </div>
            </div>
            <table className="bg-white border-2 border-gray-300 w-full text-center 2xl:rounded-lg">
                <thead className="px-2">
                    <tr >
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Nama</th>
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Repetisi Angka</th>
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Timer</th>
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Level</th>
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Detail</th>
                    </tr>
                </thead>
                <tbody >
                    {exercise.data?.map((food) => (
                        <tr key={food.id}>
                            <td className="px-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{food.name}</td>
                            <td className="md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{food.repetition_value}</td>
                            <td className="md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{food.repetition_time}</td>
                            <td className="md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{food.level}</td>
                            <td className="px-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl"><button className="px-6 py-1 my-1 rounded-md md:px-4 md:py-2 lg:px-4 lg:py-2 2xl:px-4 2xl:py-2 border-2 border-[#BFBFBF] 2xl:rounded-lg" onClick={() => handleDetailClick(food.id)}>Detail</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 text-sm md:text-md lg:text-md 2xl:text-lg">
                <Paginate totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>
    </>
}

export default Exercise
