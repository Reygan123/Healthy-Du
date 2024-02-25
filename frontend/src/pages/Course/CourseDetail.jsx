import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCoursebyId } from "../../fetching/course";
import { getAllWeek } from "../../fetching/week";
import { getAllSchedule } from "../../fetching/schedule";
import { getAllStatusProgram } from "../../fetching/status";
import { getUserLogin } from "../../fetching/user";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import Barbell from "../../assets/barbell-white.png";
import CourseBox from "../../components/Course"
import Chibite from "../../assets/mascot/chibite3.png"
import Chibite1 from "../../assets/mascot/chibite2.png"

const CourseDetail = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModalId, setOpenModalId] = useState(null);
    const [course, setCourse] = useState([]);
    const [week, setWeek] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const userData = await getUserLogin();
            setUserData(userData.data);
            console.log(userData.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCourse = async () => {
        try {
            const course = await getCoursebyId(id);
            setCourse(course.data);
            console.log("Course >>>>>", course.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchWeek = async () => {
        try {
            const weekData = await getAllWeek(1, 10, "");
            setWeek(weekData.data);
            console.log("Week >>>>>", weekData.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStatus = async () => {
        try {
            const userId = userData.id;
            console.log("userId:", userId);
            const statusData = await getAllStatusProgram(1, 10, userId, "");
            setStatus(statusData.data);
            console.log("Status >>>>>", statusData.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSchedule = async () => {
        try {
            const scheduleData = await getAllSchedule(1, "", id, "", "");
            setSchedule(scheduleData.data);
            console.log("Schedule >>>>", scheduleData.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchUser();
                await fetchCourse();
                await fetchWeek();
                await fetchSchedule();
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userData.id) {
            fetchStatus();
        }
    }, [userData.id]);

    if (loading) {
        return <Loading />;
    }

    const handleDetailClick = (id, programId) => {
        navigate(`/course/list?&courseId=${id}&programId=${programId}`, {
            state: { id, programId },
        });
    };

    const calculateTotalPrograms = (scheduleId) => {
        const programsForSchedule = schedule
            .filter((item) => item.week_id === scheduleId)
            .map((item) => item.Program.id);
        const uniqueProgramIds = new Set(programsForSchedule);
        return uniqueProgramIds.size;
    };

    const toggleModal = (scheduleId) => {
        setOpenModalId(openModalId === scheduleId ? null : scheduleId);
    };

    const renderButton = (scheduleData, index) => {
        // console.log("Button Index:", index);
        const matchedStatus = status.find(
            (s) =>
                s.Program.id === scheduleData.Program.id &&
                s.program_id === scheduleData.program_id
        );
        const buttonStatus = matchedStatus ? matchedStatus.status : "";
        const buttonColor =
            buttonStatus === "done"
                ? "bg-sky-500 border-sky-800"
                : "bg-gray-500 border-gray-800";

        const totalPrograms = calculateTotalPrograms(scheduleData.week_id);

        const buttonPositions = ["ml-0", "ml-14", "mr-0", "mr-14", "mr-0"];
        const buttonPosition = buttonPositions[index % buttonPositions.length];

        return (
            <div key={scheduleData.id} className="relative lg:w-[500px] 2xl:w-[500px] flex flex-col items-center">
                <button
                    className={`p-2 lg:p-4 2xl:p-4 rounded-full ${buttonColor} border-b-[6px] mb-2 text-white ${buttonPosition}`}
                    onClick={() => toggleModal(scheduleData.id)}
                >
                    <span>
                        <img src={Barbell} className="w-8 lg:w-8 2xl:w-10" alt="Barbell" />
                    </span>
                </button>
                {openModalId === scheduleData.id && (
                    <div className="w-40 md:w-52 lg:w-60 2xl:w-60 absolute -top-10 -left-[135px] md:-left-60 lg:-left-14 2xl:-left-10 my-2 font-bold text-xs md:text-sm lg:text-sm 2xl:text-md flex flex-col justify-center bg-sky-500 p-4 text-white rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg">
                        <h1 className="my-2">{scheduleData.Program.name}</h1>
                        <p className="mb-2">Total latihan {totalPrograms}</p>
                        <button
                            onClick={() => handleDetailClick(id, scheduleData.Program.id)}
                            className="bg-white py-1 lg:py-2 2xl:py-2 text-sky-500 w-full rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg"
                        >
                            Mulai
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="w-full flex flex-col items-center justify-center p-4">
                <div className="w-5/6 md:w-2/5 lg:w-[30%] 2xl:w-1/4">
                    <div className='bg-gradient-to-br from-sky-600 to-blue-600 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg p-5 text-white'>
                        <p className='text-md md:text-md lg:text-md 2xl:text-lg font-bold mb-2'>{course.name}</p>
                        <p className='text-xs md:text-sm lg:text-sm 2xl:text-md mb-2'>{course.description}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    {week.map((item) => (
                        <div className="flex justify-center lg:w-3/4 2xl:w-3/4">
                            <div className="flex flex-col justify-between items-center">
                                <div></div>
                                <img className="lg:w-full" src={Chibite} alt="" />
                                <div></div>
                                <div></div>
                            </div>
                            <div key={item.id} className="w-full flex-col flex justify-center items-center">
                                <div className="text-center py-2 px-10 bg-white border-2 border-[#BFBFBF] my-4 rounded-md md:rounded-lg lg:rounded-lg 2xl:rounded-lg">
                                    <p className="text-sm md:text-md lg:text-md 2xl:text-lg font-bold">{item.name}</p>
                                </div>
                                <div className=" flex-col ">
                                    {schedule.map((scheduleData, index) => (
                                        scheduleData.week_id === item.id &&
                                        renderButton(scheduleData, index)
                                    ))}

                                </div>
                            </div>
                            <div className="flex flex-col justify-between items-center">
                                <div></div>
                                <div></div>
                                <img className="lg:w-full" src={Chibite1} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CourseDetail;
