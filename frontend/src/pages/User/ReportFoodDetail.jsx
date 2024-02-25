import { useState, useEffect } from "react"
import { getAllFoodReports } from "../../fetching/food_report"
import Title from "../../components/TitleBlue"
import Excel from "../../assets/icon/xls.png"
import * as XLSX from "xlsx";
import moment from 'moment';

const ReportFood = () => {
    const [reportFood, setReportFood] = useState([])

    const userId = new URLSearchParams(location.search).get("userId");
    const date = new URLSearchParams(location.search).get("date");

    const fetchReportFood = async () => {
        try {
            const reportFood = await getAllFoodReports("", 100, "", userId, "", date)
            setReportFood(reportFood.data)
            console.log(reportFood.data)
        } catch (error) {
            console.log(error)
        }
    }

    const exportToExcel = () => {
        const columnsToExport = ['Food.name', 'Meal_Schedule.name', 'amount'];  // Sesuaikan kolom dengan struktur data yang benar

        const worksheet = XLSX.utils.json_to_sheet(
            reportFood.map((item) =>
                columnsToExport.reduce((acc, key) => {
                    const keys = key.split('.');  // Pisahkan kunci jika terdapat "." di dalamnya
                    let value = item;
                    for (const subKey of keys) {
                        value = value[subKey];
                    }
                    acc[key] = value;
                    return acc;
                }, {})
            )
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'CategoryData');
        XLSX.writeFile(workbook, 'list_kategori.xlsx');
    };

    const fullDate = date;
    let currentDate = moment(fullDate).format('MMMM Do YYYY');
    console.log(currentDate);

    useEffect(() => {
        fetchReportFood()
    }, [])

    return <>
        <div className="m-4">
            <div className="flex justify-between items-center pb-4 2xl:pb-6">
                <Title text="List Makanan" />
                <div className="px-4 py-2 bg-sky-500 text-white font-bold text-xs md:text-md lg:text-md 2xl:text-xl rounded-md">
                    {currentDate}
                </div>
                <div className="justify-center items-center gap-2 hidden md:flex lg:flex 2xl:flex">
                    <div>
                        <button
                            className="py-2 px-2 md:px-2 lg:px-2 2xl:py-5 2xl:px-5 bg-white border-2 border-b-4 lg:border-b-[6px] border-green-600 rounded-md 2xl:rounded-lg"
                            onClick={exportToExcel}
                        >
                            <span><img src={Excel} className="w-6 lg:w-8" /></span>
                        </button>
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
            <table className="bg-white border-2 border-gray-300 w-full text-center 2xl:rounded-lg">
                <thead className="px-2">
                    <tr >
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Nama</th>
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Jadwal</th>
                        <th className="py-1 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">Kalori</th>
                    </tr>
                </thead>
                <tbody >
                    {reportFood.map((item) => (
                        <tr key={item.id}>
                            <td className="px-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{item.Food.name}</td>
                            <td className="px-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{item.Meal_Schedule.name}</td>
                            <td className="px-2 md:py-2 lg:py-2 2xl:py-2 text-xs md:text-md lg:text-md 2xl:text-xl">{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default ReportFood