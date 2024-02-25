import { useState, useEffect } from "react";
import { getUserLogin, updateUser } from "../../fetching/user";
import { getAllExerciseReport } from "../../fetching/exercise_report";
import { getAllFoodReports } from "../../fetching/food_report";
import Navbar from "../../components/Navbar";
import LineChart from "../../components/Chart";
import ProfilePic from "../../assets/icon/user.png"
import Coin from "../../assets/icon/coin.png"
import Thin from "../../assets/mascot/thin.png"
import Ideal from "../../assets/mascot/fit.png"
import Fat from "../../assets/mascot/fat.png"
import Loading from "../../components/Loading"
import Title from "../../components/TitleBlue"
import Excel from "../../assets/icon/xls.png"
import * as XLSX from "xlsx";
import Paginate from "../../components/Paginate"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom";
import Box from "../../components/Box";

const Profile = () => {
    const [data, setData] = useState('null');
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [editUsername, setEditUsername] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editWeight, setEditWeight] = useState("");
    const [editHeight, setEditHeight] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [reportExercise, setReportExercise] = useState([]);
    const [exerciseChartData, setExerciseChartData] = useState({ labels: [], values: [] });
    const [reportTime, setReportTime] = useState([]);
    const [chartDataTime, setChartDataTime] = useState({ labels: [], values: [] });
    const [reportCalories, setReportCalories] = useState([]);
    const [chartDataCalories, setChartDataCalories] = useState({ labels: [], values: [] });
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState(null);
    const [totalCaloriesByDate, setTotalCaloriesByDate] = useState({});
    const [userFull, setUserFull] = useState([])
    const [reportFood, setReportFood] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const data = await getUserLogin();
            setData(data.data);
            console.log(">>", data.data);
            setUsername(data.data.username);
            setGender(data.data.gender);
            setWeight(data.data.weight);
            setHeight(data.data.height);
        } catch (error) {
            console.log(error);
        }
    };

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/welcome')
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

    const determineBmiCategory = (bmiValue) => {
        if (bmiValue < 18.5) {
            return "Underweight";
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            return "Normal Weight";
        } else if (bmiValue >= 25 && bmiValue < 30) {
            return "Overweight";
        } else {
            return "Obesitas";
        }
    };

    const calculateBMI = () => {
        if (data && data.weight && data.height) {
            const weightInKg = parseFloat(data.weight);
            const heightInM = parseFloat(data.height) / 100; // Konversi tinggi dari cm ke meter
            const bmiValue = weightInKg / (heightInM * heightInM);
            setBmi(bmiValue.toFixed(2)); // Pembulatan ke 2 desimal
            setBmiCategory(determineBmiCategory(bmiValue)); // Tentukan kategori BMI
        }
    };

    const bmiDescriptions = {
        Underweight: "Sepertinya kamu harus lebih rajin berolahraga, menambah asupan kalori harian dan protein",
        "Normal Weight": "Selamat!!, kamu sudah mencapai bb ideal",
        Overweight: "Sepertinya kamu harus mengurangi asupan kalori harian kamu dan rajin berolahraga agar mendapat badan ideal, Semangat!!!",
        Obesitas: "Yah sayang sekali kamu obesitas, kamu harus mengurangi makan dan mulai berolahraga agar dapat mengurangi berat badan, Semangat!!!"
    };

    const handleEditClick = () => {
        setIsEditMode(true);
        // Set nilai awal input sesuai dengan data yang ada
        setEditUsername(data.username)
        setEditGender(data.gender)
        setEditWeight(data.weight);
        setEditHeight(data.height);
    };

    const handleSaveClick = async () => {
        try {
            const payload = {
                username: editUsername,
                gender: editGender,
                weight: editWeight,
                height: editHeight
            };
            const response = await updateUser(payload);
            // Set data baru setelah berhasil disimpan
            setData((prevData) => ({
                ...prevData,
                username: editUsername,
                gender: editGender,
                weight: editWeight,
                height: editHeight
            }));
            setIsEditMode(false);
            calculateBMI();
            setBmiCategory(determineBmiCategory(bmi));
        } catch (error) {
            console.log(error);
        }
    };

    const renderWeightHeight = () => {
        if (isEditMode) {
            return (
                <div className="grid grid-cols-2 justify-center w-full gap-2">
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-sm 2xl:text-md">Username</p>
                        <input
                            type="text"
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                            className="border border-sky-500 text-center p-2 rounded-md w-full text-sm md:text-md lg:text-md 2xl:text-lg"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-sm 2xl:text-md">Jenis Kelamin</p>
                        <select
                            value={editGender}
                            onChange={(e) => setEditGender(e.target.value)}
                            className="border border-sky-500 text-center p-2 rounded-md w-full text-sm md:text-md lg:text-md 2xl:text-lg"
                        >
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-sm 2xl:text-md">Tinggi Badan</p>
                        <input
                            type="text"
                            value={editHeight}
                            onChange={(e) => setEditHeight(e.target.value)}
                            className="border border-sky-500 text-center p-2 rounded-md w-full text-sm md:text-md lg:text-md 2xl:text-lg"
                            placeholder="Height"
                        />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-sm 2xl:text-md">Berat Badan</p>
                        <input
                            type="text"
                            value={editWeight}
                            onChange={(e) => setEditWeight(e.target.value)}
                            className="border border-sky-500 text-center p-2 rounded-md w-full text-sm md:text-md lg:text-md 2xl:text-lg"
                            placeholder="Weight"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="grid grid-cols-2 justify-center w-full gap-2">
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-sm 2xl:text-md">Username</p>
                        <div className="bg-white border border-gray-400 text-left p-2 rounded-md">
                            <p className="text-sm md:text-md lg:text-md 2xl:text-lg">{data.username}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-sm 2xl:text-md">Jenis Kelamin</p>
                        <div className="bg-white border border-gray-400 text-left p-2 rounded-md">
                            <p className="text-sm md:text-md lg:text-md 2xl:text-lg">{data.gender}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-sm 2xl:text-md">Tinggi Badan</p>
                        <div className="bg-white border border-gray-400 text-left p-2 rounded-md">
                            <p className="text-sm md:text-md lg:text-md 2xl:text-lg">{data.height}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-sm 2xl:text-md">Berat Badan</p>
                        <div className="bg-white border border-gray-400 text-left p-2 rounded-md">
                            <p className="text-sm md:text-md lg:text-md 2xl:text-lg">{data.weight}</p>
                        </div>
                    </div>
                </div>
            );
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
        }
    }, [currentPage, dataPerPage, searchTerm]);

    const handleDetailClick = (date) => {
        navigate(`/profile/report-food?&userId=${data.id}&date=${date}`, {
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
        XLSX.writeFile(workbook, 'Laporan Kalori Harian.xlsx');
    };

    const handleClick = () => {
        navigate(`/category/add`);
    }

    if (loading) {
        return <Loading />;
    }

    const fetchReportFood = async () => {
        try {
            const reportFood = await getAllFoodReports(currentPage, dataPerPage, searchTerm, data.id, "", "");
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

    useEffect(() => {
        fetchUser();
        fetchFoodFull()
    }, []);

    useEffect(() => {
        fetchReportExercise();
        calculateBMI();
        fetchReportFood()
    }, [data.id]);

    return (
        <>
            <Navbar />
            {/* <h1 className="px-4 my-2 text-center text-lg md:text-lg lg:text-xl 2xl:text-2xl font-extrabold">Profile</h1> */}
            <div className="flex flex-col justify-center items-center lg:hidden 2xl:hidden my-4">
                <div>
                    <div className="w-full flex flex-col justify-center items-center bg-white rounded-md p-6 gap-3">
                        <div className="flex justify-between items-center w-full">
                            <div className="w-fit flex justify-center items-center">
                                <img className="w-20" src={ProfilePic} />
                                <div className="flex flex-col justify-center items-start ml-2">
                                    <p className="text-lg md:text-xl lg:text-xl 2xl:text-2xl font-bold">{data.username}</p>
                                    <p className="text-xs md:text-sm lg:text-sm 2xl:text-md">{data.email}</p>
                                    <div className="flex justify-center gap-2 items-end">
                                        <Button
                                            onClick={logOut}
                                            text="Logout"
                                            border="border-red-700"
                                            bg="bg-red-500"
                                            width="px-6 py-1 lg:px-6 2xl:px-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-2 w-[20%]">
                                <img className="w-[50%] 2xl:w-1/3" src={Coin} alt="" />
                                <p className="text-lg md:text-lg lg:text-xl 2xl:text-2xl font-extrabold text-orange-500">{data.point}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            {renderWeightHeight()}

                            <Button
                                onClick={isEditMode ? handleSaveClick : handleEditClick}
                                text={isEditMode ? "Simpan" : "Ubah"}
                                border="border-sky-700"
                                bg="bg-sky-500"
                                width="w-full md:w-1/4 my-2"
                            />

                        </div>
                    </div>
                </div>
                <div>
                    {bmiCategory && (
                        <div className="flex flex-col justify-center items-center text-sm md:text-md lg:text-md 2xl:text-lg w-full ">
                            <div className="w-[35%] md:w-3/12 justify-center items-center p-2 rounded-md ">
                                {bmiCategory === "Underweight" && <img className="w-full" src={Thin} alt="Underweight" />}
                                {bmiCategory === "Normal Weight" && <img className="w-full" src={Ideal} alt="Normal Weight" />}
                                {bmiCategory === "Overweight" && <img className="w-full" src={Fat} alt="Overweight" />}
                                {bmiCategory === "Obesitas" && <img className="w-full" src={Fat} alt="Obesitas" />}
                            </div>
                            <div className="w-full flex flex-col justify-center items-center p-4 mx-4 gap-2 rounded-md text-center text-xs md:text-sm lg:text-sm 2xl:text-md">
                                {/* <p className="text-sm md:text-md lg:text-md 2xl:text-lg font-bold">{bmiCategory}</p> */}
                                <div className="flex justify-center items-center gap-2 w-full">
                                    <p className="px-4 py-2 text-left bg-white border border-sky-500 border-b-4 border-b-sky-600 text-sky-500 font-bold rounded-md">{bmiCategory}</p>
                                    <div className="text-center">{bmi && <p className="px-4 py-2 bg-sky-500 border-b-4 border-sky-800 text-white font-bold rounded-md">{bmi}</p>}</div>
                                </div>

                                {bmiCategory && <p className="px-4 py-2 text-justify bg-white border border-gray-300 text-black rounded-md">{bmiDescriptions[bmiCategory]}</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full hidden justify-center items-center px-6 md:px-4 lg:flex 2xl:flex lg:flex-col 2xl:flex-col my-4">

                <div className="w-1/2 flex flex-col justify-center items-center bg-white rounded-md p-6 gap-3">
                    <div className="flex justify-between items-center w-full">
                        <div className="w-fit flex justify-center items-center">
                            <img className="w-20" src={ProfilePic} />
                            <div className="flex flex-col justify-center items-start ml-2">
                                <p className="text-sm md:text-md lg:text-md 2xl:text-lg font-bold">{data.username}</p>
                                <p className="text-sm md:text-md lg:text-md 2xl:text-lg">{data.email}</p>
                                <div className="flex justify-center gap-2 items-end">
                                    <Button
                                        onClick={logOut}
                                        text="Logout"
                                        border="border-red-700"
                                        bg="bg-red-500"
                                        width="px-4 py-1 lg:px-6 2xl:px-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2 w-[20%]">
                            <img className="w-[50%] 2xl:w-1/3" src={Coin} alt="" />
                            <p className="text-lg md:text-lg lg:text-xl 2xl:text-2xl font-extrabold text-orange-500">{data.point}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full">
                        {renderWeightHeight()}

                        <Button
                            onClick={isEditMode ? handleSaveClick : handleEditClick}
                            text={isEditMode ? "Simpan" : "Ubah"}
                            border="border-sky-700"
                            bg="bg-sky-500"
                            width="w-full md:w-1/4 my-2"
                        />

                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                    {bmiCategory && (
                        <div className="flex justify-center items-center text-sm md:text-md lg:text-md 2xl:text-lg">
                            <div className="md:w-1/5 lg:w-3/12 2xl:w-1/5 p-2 rounded-md">
                                {bmiCategory === "Underweight" && <img className="w-full" src={Thin} alt="Underweight" />}
                                {bmiCategory === "Normal Weight" && <img className="w-full" src={Ideal} alt="Normal Weight" />}
                                {bmiCategory === "Overweight" && <img className="w-full" src={Fat} alt="Overweight" />}
                                {bmiCategory === "Obesitas" && <img className="w-full" src={Fat} alt="Obesitas" />}
                            </div>
                            <div className="w-1/2 flex flex-col justify-center items-center bg-white p-2 gap-2 rounded-md text-center text-sm md:text-md lg:text-md 2xl:text-lg">
                                {/* <p className="text-sm md:text-md lg:text-md 2xl:text-lg font-bold">{bmiCategory}</p> */}
                                <div className="flex items-start gap-2 w-full">
                                    <p className="px-4 py-2 text-left bg-white border border-sky-500 border-b-4 border-b-sky-600 text-sky-500 font-bold rounded-md">{bmiCategory}</p>
                                    <div className="text-center mb-2">{bmi && <p className="px-4 py-2 bg-sky-500 border-b-4 border-sky-800 text-white font-bold rounded-md">{bmi}</p>}</div>
                                </div>

                                {bmiCategory && <p className="px-4 py-2 text-justify bg-white border border-gray-300 text-black rounded-md">{bmiDescriptions[bmiCategory]}</p>}
                            </div>
                        </div>
                    )}
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

            <div className="px-6 md:px-4 mb-4 lg:mb-6 2xl:mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 w-full place-items-center">
                <div className="bg-white w-[100%] md:w-4/5 lg:w-4/5 2xl:w-4/5 border border-sky-500">
                    <LineChart judul="Grafik Total Latihan" data={exerciseChartData} />
                </div>
                <div className="bg-white w-[100%] md:w-4/5 lg:w-4/5 2xl:w-4/5 border border-sky-500">
                    <LineChart judul="Grafik Total Waktu Latihan" data={chartDataTime} />
                </div>
                {/* <div className="bg-white w-[100%] md:w-4/5 lg:w-4/5 2xl:w-4/5 border border-sky-500">
                    <LineChart judul="Grafik Total Kalori" data={chartDataCalories} />
                </div> */}
            </div>
        </>
    );
};

export default Profile;

