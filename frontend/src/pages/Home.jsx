import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllMeal } from '../fetching/meal_schedule';
import { getAllFoodReports, deleteFoodReport } from '../fetching/food_report';
import { getUserLogin } from '../fetching/user';
import Plus from '../assets/plus.png';
import Delete from '../assets/minus.png';
import { getAllExerciseReport } from '../fetching/exercise_report';
import Course from '../components/Course';
import { getAllCourse } from '../fetching/course';
import Burger from '../assets/mascot/tiger1.png'
import Bg from '../assets/bg.png';

const Home = () => {
    const [userData, setUserData] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [course, setCourse] = useState([]);
    const [coursePrivate, setCoursePrivate] = useState([]);
    const [report, setReport] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [foodReportData, setFoodReportData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const userData = await getUserLogin();
            setUserData(userData.data);
            console.log(userData.data)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMeal = async () => {
        try {
            const mealData = await getAllMeal(1, 10, "");
            setMealData(mealData.data);
            console.log('Meal<<<<<<', mealData.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExerciseReports = async () => {
        try {
            const userId = userData.id
            console.log("userId:", userId);
            const report = await getAllExerciseReport(1, 10, userId)
            setReport(report.data)
            console.log("Exercise Report >>>>", report.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCourse = async () => {
        try {
            const course = await getAllCourse(1, 10, "dada")
            setCourse(course.data)
            console.log("Course >>>", course.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCoursePrivate = async () => {
        try {
            const coursePrivate = await getAllCourse(1, 1, userData.name)
            setCoursePrivate(coursePrivate.data)
            console.log("Course Saya", coursePrivate.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchFoodReports = async () => {
        try {
            const mealIds = mealData.map((meal) => meal.id);
            const requests = mealIds.map((mealId) =>
                getAllFoodReports(1, 10, '', userData.id, mealId)
            );
            const foodReportsArray = await Promise.all(requests);
            setFoodReportData(prevFoodReportData => {
                const newFoodReportData = { ...prevFoodReportData };
                foodReportsArray.forEach((response, index) => {
                    const mealId = mealIds[index];
                    newFoodReportData[mealId] = response.data;
                });
                return newFoodReportData;
            });
            console.log('Food Report Response:', foodReportData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteReport = async (reportId) => {
        try {
            await deleteFoodReport(reportId);
            fetchFoodReports();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchMeal();
        fetchUser();
        fetchCourse();
    }, []);

    useEffect(() => {
        fetchExerciseReports();
        fetchCoursePrivate()
    }, [userData.id])

    useEffect(() => {
        if (mealData.length > 0 && userData.id && !isDataLoaded) {
            fetchFoodReports();
        }
    }, [mealData, userData.id, isDataLoaded]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    if (loading) {
        return <Loading />;
    }

    const handleAddFoodClick = (mealId, mealName) => {
        navigate(`/food?mealId=${mealId}&mealName=${encodeURIComponent(mealName)}`, {
            state: { mealId, mealName }
        });
    };

    const calculateHarrisBenedictBMR = () => {
        const bmr = userData.gender === 'male'
            ? 88.362 + (13.397 * userData.weight) + (4.799 * userData.height) - (5.677 * userData.age)
            : 447.593 + (9.247 * userData.weight) + (3.098 * userData.height) - (4.330 * userData.age);

        return bmr;
    };

    const calculateDailyCalories = () => {
        const bmr = calculateHarrisBenedictBMR();
        const dailyCalories = Math.round(bmr * userData.activity_factor) - 500;
        return dailyCalories;
    };

    const calculateTotalAmount = () => {
        let totalAmount = 0;

        Object.values(foodReportData).forEach((foodReports) => {
            foodReports.forEach((report) => {
                if (new Date(report.date).toDateString() === new Date().toDateString()) {
                    totalAmount += report.amount;
                }
            });
        });

        return totalAmount;
    };

    const convertSecondsToMinutes = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        return minutes;
    };

    const handleClick = (id) => {
        navigate(`/course/${id}`)
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-col md:flex-row-reverse lg:flex-row-reverse 2xl:flex-row-reverse justify-between'>
                <div className='bg-white m-4 md:hidden lg:hidden 2xl:hidden flex-col-reverse justify-center items-center md:flex-row lg:flex-row 2xl:flex-row flex'>
                    <div className='p-8 lg:p-6 2xl:p-8 flex flex-col justify-center items-center text-center md:flex md:justify-center md:items-start md:text-left lg:flex lg:justify-center lg:items-start lg:text-left 2xl:flex 2xl:justify-center 2xl:items-start 2xl:text-left'>
                        <h1 className='text-lg md:text-lg lg:text-2xl 2xl:text-2xl font-extrabold mb-2 lg:mb-4 2xl:mb-4'>Ayo Bangun Badan Ideal Kamu</h1>
                        <p className='text-justify text-sm md:text-md lg:text-md 2xl:text-lg my-4 lg:my-4 2xl:my-4'>Ayo mulai perjalanan kamu selama 4 minggu untuk membangun tubuh ideal yang kamu inginkan, dengan mengikuti program latihan khusus yang udah chibite buatin buat kamu</p>
                        <button className='px-10 py-2 lg:px-14 2xl:px-14 border-b-4 border-[#006090] bg-[#00A9FF] rounded-md text-white font-bold'>Mulai</button>
                    </div>
                    <div className='w-2/5 md:w-full lg:w-1/3 2xl:w-2/5 flex justify-center items-center'>
                        <img src={Burger} alt="" />
                    </div>
                </div>
                <section className='m-2 md:my-4 lg:my-4 2xl:my-4 shadow-md  bg-white border-2 border-[#f5f4f4] md:w-[80%] lg:w-2/5 2xl:w-[30%] lg:border-0 2xl:border-0 rounded-md p-10'>
                    {report.length > 0 && (
                        <div className='flex justify-between mb-4 lg:mb-6 2xl:mb-6 text-center text-md'>
                            {['total_exercise', 'total_time', 'total_calories'].map((field) => (
                                <div key={field}>
                                    {field === 'total_time' ? (
                                        <div className='flex flex-col'>
                                            <p className='font-bold text-sky-500 text-md'>
                                                {convertSecondsToMinutes(
                                                    report.reduce((sum, item) => sum + (item[field] || 0), 0)
                                                )}{' '}
                                            </p>
                                            <p className='text-md'>Menit</p>
                                        </div>
                                    ) : (
                                        <p className='font-bold text-sky-500 text-md'>
                                            {report.reduce((sum, item) => sum + (item[field] || 0), 0)}
                                        </p>
                                    )}
                                    {field === 'total_exercise' && <p className='text-md'>Latihan</p>}
                                    {field === 'total_calories' && <p className='text-md'>Kalori</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-sm md:text-md lg:text-md 2xl:text-lg">
                        <div className='flex justify-between'>
                            <h3>Sisa Kalori</h3>
                            <p className='text-sky-500 font-bold'>{calculateDailyCalories() - calculateTotalAmount()}</p>
                        </div>
                        <div className='flex justify-between'>
                            <h3>Konsumsi Kalori</h3>
                            <p className='text-sky-500 font-bold'>{calculateTotalAmount()}</p>
                        </div>
                        {Object.entries(foodReportData).map(([mealId, foodReports]) => (
                            <div key={mealId}>
                                <div className="flex justify-between items-center px-4 py-2 border-2 border-b-4 border-[#BFBFBF] rounded-md">
                                    <div className='flex items-center'>
                                        <img src={mealData.find((meal) => meal.id === Number(mealId))?.image_url} alt="" className='w-8 h-8 mr-2' />
                                        <h3>{mealData.find((meal) => meal.id === Number(mealId))?.name}</h3>
                                    </div>
                                    <button onClick={() => handleAddFoodClick(mealId, mealData.find((meal) => meal.id === Number(mealId))?.name)}>
                                        <span><img src={Plus} className="w-4 h-4" alt="Add Food" /></span>
                                    </button>
                                </div>

                                <ul className='w-full border-2 rounded-md mb-4 px-4 border-[#BFBFBF]'>
                                    {foodReports
                                        .filter(report => new Date(report.date).toDateString() === new Date().toDateString())
                                        .map((report) => (
                                            <li className='flex justify-between items-center py-1' key={report.id}>
                                                <p>{report.Food.name}</p>
                                                <p className='text-sky-500 font-bold'>
                                                    {report.amount}
                                                    <span>
                                                        <button onClick={() => handleDeleteReport(report.id)}>
                                                            <span><img src={Delete} alt="" className='ml-2 w-4 h-4' /></span>
                                                        </button>
                                                    </span>
                                                </p>
                                            </li>
                                        ))}
                                </ul>

                            </div>
                        ))}
                    </div>
                </section >
                <section className='my-4 mx-4'>
                    <div className='bg-white shadow-md p-2 mb-4 md:flex lg:flex 2xl:flex flex-col-reverse justify-center items-center md:flex-row lg:flex-row 2xl:flex-row hidden rounded-md'>
                        <div className='p-4 md:p-4 lg:p-6 2xl:p-8 flex flex-col justify-center items-center text-center md:flex md:justify-center md:items-start md:text-left lg:flex lg:justify-center lg:items-start lg:text-left 2xl:flex 2xl:justify-center 2xl:items-start 2xl:text-left'>
                            <h1 className='text-wrap lg:text-balance text-lg md:text-lg lg:text-xl 2xl:text-2xl font-extrabold mb-2 lg:mb-2 2xl:mb-4'>Ayo Bangun Badan Ideal Kamu</h1>
                            <p className='text-justify text-sm md:text-md lg:text-md 2xl:text-lg my-2 lg:my-4 2xl:my-4'>Ayo mulai perjalanan kamu selama 4 minggu untuk membangun tubuh ideal yang kamu inginkan, dengan mengikuti program latihan khusus yang udah chibite buatin buat kamu</p>
                            <button className='text-sm md:text-md lg:text-md 2xl:text-lg px-10 py-2 lg:px-14 2xl:px-14 border-b-4 border-[#006090] bg-[#00A9FF] rounded-md text-white font-extrabold'>Mulai</button>
                        </div>
                        <div className='w-1/2 md:w-full lg:w-1/3 2xl:w-2/5 flex justify-center items-center'>
                            <img src={Burger} alt="" />
                        </div>
                    </div>
                    <div className='lg:m-0 2xl:m-0'>
                        <p className='text-sm md:text-md lg:text-md 2xl:text-lg font-bold my-4'>Program Khusus Kamu</p>
                        <div className='w-full md:w-full lg:w-1/2 2xl:w-1/2'>
                            {coursePrivate.map((joinCourse) => {
                                return (
                                    <div key={joinCourse.id}>
                                        <Course name={joinCourse.name} bg="bg-gradient-to-br to-yellow-300 from-orange-500" description={joinCourse.description} onClick={() => handleClick(joinCourse.id)} />
                                    </div>
                                )
                            })}
                        </div>
                        <p className='text-sm md:text-md lg:text-md 2xl:text-lg font-bold my-4'>Pemula</p>
                        <div className='grid gap-4 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3'>
                            {course.map((courseData) => {
                                return (
                                    <div key={courseData.id}>
                                        <Course bg="bg-gradient-to-br from-cyan-400 to-blue-500" name={courseData.name} description={courseData.description} onClick={() => handleClick(courseData.id)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div >
        </>
    );
};

export default Home;
