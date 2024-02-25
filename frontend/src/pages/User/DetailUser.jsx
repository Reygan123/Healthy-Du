import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserbyId } from "../../fetching/user"
import { getAllFoodReports } from "../../fetching/food_report"
import { getAllExerciseReport } from "../../fetching/exercise_report"
import LineChart from "../../components/Chart"
import Loading from "../../components/Loading"
import Title from "../../components/TitleBlue"
import Excel from "../../assets/icon/xls.png"
import * as XLSX from "xlsx";
import Paginate from "../../components/Paginate"
import Box from "../../components/Box"
import ArrowBack from '../../assets/back.png';
import Button from "../../components/Button"

const UserDetail = () => {
    const { id } = useParams()
    const [user, setUser] = useState([])
    const [reportFood, setReportFood] = useState([])
    const [userFull, setUserFull] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalCaloriesByDate, setTotalCaloriesByDate] = useState({});
    const [reportExercise, setReportExercise] = useState([]);
    const [exerciseChartData, setExerciseChartData] = useState({ labels: [], values: [] });
    const [reportTime, setReportTime] = useState([]);
    const [chartDataTime, setChartDataTime] = useState({ labels: [], values: [] });
    const [reportCalories, setReportCalories] = useState([]);
    const [chartDataCalories, setChartDataCalories] = useState({ labels: [], values: [] });
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const user = await getUserbyId(id)
            setUser(user.data)
            console.log(user.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchReportExercise = async () => {
        try {
            const reportExercise = await getAllExerciseReport("", "", data.id);
            console.log("LATIHAN ", reportExercise.data);

            const exerciseResult = {};
            reportExercise.data.forEach(item => {
                const date = new Date(item.date).toLocaleDateString();
                if (!exerciseResult[date]) {
                    exerciseResult[date] = 0;
                }
                exerciseResult[date] += item.total_exercise;
            });

            const exerciseLabels = Object.keys(exerciseResult);
            const exerciseValues = Object.values(exerciseResult);

            setReportExercise(reportExercise.data);
            setExerciseChartData({
                labels: exerciseLabels,
                values: exerciseValues
            });

            const timeResult = {};
            reportExercise.data.forEach(item => {
                const date = new Date(item.date).toLocaleDateString();
                if (!timeResult[date]) {
                    timeResult[date] = 0;
                }
                timeResult[date] += item.total_time;
            });

            const timeLabels = Object.keys(timeResult);
            const timeValues = Object.values(timeResult);

            setReportTime(reportExercise.data);
            setChartDataTime({
                labels: timeLabels,
                values: timeValues
            });

            const caloriesResult = {};
            reportExercise.data.forEach(item => {
                const date = new Date(item.date).toLocaleDateString();
                if (!caloriesResult[date]) {
                    caloriesResult[date] = 0;
                }
                caloriesResult[date] += item.total_time;
            });

            const caloriesLabels = Object.keys(caloriesResult);
            const caloriesValues = Object.values(caloriesResult);

            setReportCalories(reportExercise.data);
            setChartDataCalories({
                labels: caloriesLabels,
                values: caloriesValues
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchReportFood = async () => {
        try {
            const reportFood = await getAllFoodReports(currentPage, dataPerPage, searchTerm, id, "", "");
            setReportFood(reportFood.data);
            console.log("MAKANAN ", reportFood.data)
            setTotalPages(Math.ceil(reportFood.data.totalItems / dataPerPage));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFoodFull = async () => {
        try {
            const userFull = await getAllFoodReports("", 1000, "", "", "");
            setUserFull(userFull.data);
            console.log("LOLLL>", userFull.data);
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

    const handleClick = () => {
        navigate(`/user`);
    };

    const handleEditClick = () => {
        navigate(`/user/edit/${id}`);
    };

    const handleDetailClick = (date) => {
        navigate(`/user/report-food?&userId=${id}&date=${date}`, {
            state: { date }
        });
    };

    const exportToExcel = () => {
        const columnsToExport = ['Tanggal', 'Total Kalori'];  // Sesuaikan kolom dengan struktur data yang benar

        const worksheet = XLSX.utils.json_to_sheet(
            Object.keys(totalCaloriesByDate).map(date => ({
                Tanggal: date,
                'Total Kalori': totalCaloriesByDate[date].totalCalories,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ReportFoodData');
        XLSX.writeFile(workbook, 'laporan_makanan.xlsx');
    };


    if (loading) {
        return <Loading />;
    }

    useEffect(() => {
        if (searchTerm.length >= 3 || searchTerm.length === 0) {
            setLoading(false);
            fetchReportFood();
            fetchReportExercise();
        }
    }, [currentPage, dataPerPage, searchTerm]);

    useEffect(() => {
        fetchFoodFull()
    }, [])

    useEffect(() => {
        fetchUser()
    }, [id])

    useEffect(() => {
        const totalCaloriesObj = {};
        reportFood.forEach((item) => {
            const date = new Date(item.date).toLocaleDateString();
            if (!totalCaloriesObj[date]) {
                totalCaloriesObj[date] = {
                    totalCalories: 0,
                    details: []
                };
            }
            totalCaloriesObj[date].totalCalories += item.amount;
            totalCaloriesObj[date].details.push(item);
        });

        setTotalCaloriesByDate(totalCaloriesObj);
    }, [reportFood]);

    return <>
        <div className="flex flex-col gap-2 md:gap-2 lg:gap-4 2xl:gap-4 justify-center items-center my-4 md:my-6 lg:my-8 w-full">
            <div className="flex justify-between items-center w-full px-2 lg:px-4 2xl:px-6">
                <button className="p-2 md:p-2 lg:p-2 2xl:p-4 bg-white border border-b-2 border-red-500 rounded-md" onClick={handleClick}>
                    <span><img src={ArrowBack} alt="" className="w-4 h-4 mr-1" /></span>
                </button>
                <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Detail Pengguna</h1>
                <div></div>
            </div>
            <Box title="Nama" text={user.name} />
            <Box title="Username" text={user.username} />
            <Box title="Jenis Kelamin" text={user.gender} />
            <Box title="Email" text={user.email} />
            {/* <Box title="Password" text={user.password} /> */}
            <Box title="Tinggi Badan" text={user.height} />
            <Box title="Berat Badan" text={user.weight} />
            <Box title="Poin" text={user.poin} />
            <div className="flex mt-4 w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 items-center justify-center gap-2 md:gap-2 lg:gap-4 2xl:gap-4">
                <Button onClick={handleEditClick} text="Ubah" border="border-[#006090]" bg="bg-[#00A9FF]" width="w-1/2" />
                {/* <Button onClick={handleDelete} text="Hapus" border="border-red-700" bg="bg-red-500" width="w-1/2" /> */}
            </div>
        </div>
        <div className="m-4">
            <div className="flex justify-between items-center pb-4 2xl:pb-6">
                <Title text="List Laporan Makanan" />
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
                    </div>
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
                </div>
            </div>
            <table className="bg-white border-2 border-gray-300 w-full text-center 2xl:rounded-lg">
                <thead className="px-2">
                    <tr >
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Tanggal</th>
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Total Kalori</th>
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(totalCaloriesByDate).map((date, index) => (
                        <tr key={index}>
                            <td className="px-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{date}</td>
                            <td className="px-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{totalCaloriesByDate[date].totalCalories}</td>
                            <td className="px-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">
                                <button className="px-6 py-1 my-1 rounded-md md:px-4 md:py-2 lg:px-4 lg:py-2 2xl:px-4 2xl:py-2 border-2 border-[#BFBFBF] 2xl:rounded-lg" onClick={() => handleDetailClick(totalCaloriesByDate[date].details[0].date)}>
                                    Detail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 text-sm md:text-md lg:text-md 2xl:text-lg">
                <Paginate totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>

        <div className="px-6 md:px-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 w-full place-items-center">
            <div className="bg-white w-[100%] md:w-4/5 lg:w-4/5 2xl:w-4/5 border border-sky-500">
                <LineChart judul="Grafik Total Latihan" data={exerciseChartData} />
            </div>
            <div className="bg-white w-[100%] md:w-4/5 lg:w-4/5 2xl:w-4/5 border border-sky-500">
                <LineChart judul="Grafik Total Waktu Latihan" data={chartDataTime} />
            </div>
            <div className="bg-white w-[100%] md:w-4/5 lg:w-4/5 2xl:w-4/5 border border-sky-500">
                <LineChart judul="Grafik Total Kalori" data={chartDataCalories} />
            </div>
        </div>
    </>
}

export default UserDetail
