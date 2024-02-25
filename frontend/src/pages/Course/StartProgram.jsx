import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProgramExercise } from "../../fetching/program_exercise";
import { createExerciseReport } from "../../fetching/exercise_report";
import { getUserLogin, updateUser } from "../../fetching/user";
import { createStatusProgram } from "../../fetching/status";
import Loading from "../../components/Loading";
import Pause from "../../assets/pause.png";
import Coin from "../../assets/icon/coin1.png"
import Coin1 from "../../assets/icon/coin.png"
import Resume from "../../assets/play.png"
import AudioStart from "../../assets/voice/selesai1.mp3"
import AudioRest from "../../assets/voice/istirahat1.mp3"
import Jump from "../../assets/mascot/jump.png"

const StartProgram = () => {
    const [loading, setLoading] = useState(true);
    const [programExercise, setProgramExercise] = useState([]);
    const [data, setData] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [countdown, setCountdown] = useState(15);
    const [timer, setTimer] = useState(20);
    const [restCountdown, setRestCountdown] = useState(30);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
    const [totalExercises, setTotalExercises] = useState(0);
    const navigate = useNavigate()
    const [audio] = useState(new Audio(AudioStart));
    const [audioRest] = useState(new Audio(AudioRest));
    const [isAudioRestPlayed, setIsAudioRestPlayed] = useState(false);
    const [isAudioStartPlayed, setIsAudioStartPlayed] = useState(false);
    const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);
    const [showReport, setShowReport] = useState(false);


    const courseId = new URLSearchParams(location.search).get("courseId");
    const programId = new URLSearchParams(location.search).get("programId");

    const fetchProgramExercise = async () => {
        const programExercise = await getAllProgramExercise(1, 10, programId, "");
        setProgramExercise(programExercise.data);
        setLoading(false);
        console.log("Program Exercise >>>> ", programExercise.data);
    };

    const fetchUser = async () => {
        try {
            const data = await getUserLogin()
            setData(data.data)
            console.log("User >>> ", data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleNextExercise = () => {
        setCurrentExerciseIndex((prevIndex) =>
            prevIndex < programExercise.length - 1 ? prevIndex + 1 : prevIndex
        );
        setCountdown(15);
        setTimer(1);
        setRestCountdown(15);
        setIsTimerRunning(true);
        setTotalExercises((prevTotal) => prevTotal + 1);

        // Cek apakah semua gerakan telah selesai
        if (currentExerciseIndex === programExercise.length - 2) {
            setAllExercisesCompleted(true);
        }
    };


    const handleRepeatExercise = () => {
        setCountdown(15);
        setTimer(1);
        setRestCountdown(15);
        setIsTimerRunning(true);
    };

    const handleToggleTimer = () => {
        setIsTimerRunning((prevIsTimerRunning) => !prevIsTimerRunning);
    };

    const handleSkip = () => {
        if (countdown > 0) {
            setCountdown(0);
        } else if (restCountdown > 0) {
            setRestCountdown(0);
        }
    };

    const handleCreateReport = async () => {
        try {
            const payload = {
                userId: data.id,
                total_exercise: totalExercises,
                total_time: stopwatchSeconds,
                total_calories: 0
            }
            const create = {
                userId: data.id,
                programId: programId,
                status: "done"
            }
            const updatedUser = await updateUser({
                id: data.id,
                point: data.point + 15,
            });
            console.log(updatedUser)
            const status = await createStatusProgram(create)
            console.log('Status Response:', status);
            const createReport = await createExerciseReport(payload);
            navigate(`/course/${courseId}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProgramExercise();
        fetchUser();
    }, []);

    useEffect(() => {
        let countdownInterval;
        let timerInterval;
        let restInterval;
        let stopwatchInterval;

        stopwatchInterval = setInterval(() => {
            setStopwatchSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        if (countdown > 0) {
            if (!isAudioStartPlayed) {
                audio.play();
                setIsAudioStartPlayed(true);
            }
            countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (isTimerRunning && timer > 0) {
            timerInterval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 5) {
                        audio.play();
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        } else if (isTimerRunning && restCountdown > 0) {
            if (!isAudioRestPlayed) {
                audioRest.play();
                setIsAudioRestPlayed(true);
            }
            restInterval = setInterval(() => {
                setRestCountdown((prevRestCountdown) =>
                    prevRestCountdown > 1 ? prevRestCountdown - 1 : 1
                );
            }, 1000);
        } else if (currentExerciseIndex === programExercise.length - 1) {
            setIsTimerRunning(false);
            clearInterval(stopwatchInterval);
        }

        if (restCountdown === 0 && currentExerciseIndex !== programExercise.length - 1) {

        }

        return () => {
            clearInterval(countdownInterval);
            clearInterval(timerInterval);
            clearInterval(restInterval);
            clearInterval(stopwatchInterval);
        };
    }, [countdown, timer, restCountdown, isTimerRunning, currentExerciseIndex, programExercise]);

    console.log("Waktu >>>>", stopwatchSeconds)
    console.log("Latihan >>>>", totalExercises)


    if (loading) {
        return <Loading />;
    }

    const ReportView = ({ totalExercises, stopwatchSeconds }) => {
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <img className="w-1/2 md:w-1/5 lg:w-1/5 2xl:w-2/12" src={Jump} alt="" />
                <h1 className="text-lg md:text-lg lg:text-xl 2xl:text-2xl font-extrabold">Latihan Selesai!</h1>
                <div className="w-full flex flex-col justify-center items-center ">
                    <div className="w-full flex justify-center items-center gap-2 p-6">
                        <div className=" bg-sky-500 w-[40%] md:w-[10%] lg:w-[10%] 2xl:w-[6%] rounded-md md:rounded-lg lg:rounded-lg">
                            <p className="text-white font-extrabold p-2 text-sm md:text-md lg:text-md 2xl:text-lg">Latihan</p>
                            <div className="p-4 lg:p-6 2xl:p-8 bg-white m-1 text-sky-500 font-bold text-center rounded-md md:rounded-lg lg:rounded-lg">
                                <p className="text-sm md:text-md lg:text-md 2xl:text-lg">{totalExercises}</p>
                            </div>
                        </div>
                        <div className="bg-sky-500 w-[40%] md:w-[10%] lg:w-[10%] 2xl:w-[6%] rounded-md md:rounded-lg lg:rounded-lg">
                            <p className="text-white font-extrabold p-2 text-sm md:text-md lg:text-md 2xl:text-lg">Kalori</p>
                            <div className="p-4 lg:p-6 2xl:p-8 bg-white m-1 text-sky-500 font-bold text-center rounded-md md:rounded-lg lg:rounded-lg">
                                <p className="text-sm md:text-md lg:text-md 2xl:text-lg">{totalExercises}</p>
                            </div>
                        </div>
                        <div className="bg-sky-500 w-[40%] md:w-[10%] lg:w-[10%] 2xl:w-[6%] rounded-md md:rounded-lg lg:rounded-lg">
                            <p className="text-white font-extrabold p-2 text-sm md:text-md lg:text-md 2xl:text-lg">Waktu</p>
                            <div className="p-4 lg:p-6 2xl:p-8 bg-white m-1 text-sky-500 font-bold text-center rounded-md md:rounded-lg lg:rounded-lg">
                                <p className="text-sm md:text-md lg:text-md 2xl:text-lg">{Math.floor(stopwatchSeconds / 60)}:{(stopwatchSeconds % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</p>
                            </div>
                        </div>
                        <div className="bg-[#FF8A00] w-[40%] md:w-[10%] lg:w-[10%] 2xl:w-[6%] rounded-md md:rounded-lg lg:rounded-lg">
                            <p className="text-white font-extrabold p-2 text-sm md:text-md lg:text-md 2xl:text-lg">Poin</p>
                            <div className="p-4 lg:p-4 2xl:p-6 flex justify-center items-center bg-white m-1 text-[#FF8A00] font-bold text-center rounded-md md:rounded-lg lg:rounded-lg">
                                <span className="flex justify-center items-center"><img className="w-1/2 md:w-1/2 lg:w-1/2 2xl:w-2/5 mr-1 " src={Coin1} alt="" />15</span>
                            </div>
                        </div>
                    </div>
                    <button className="py-2 px-4 lg:px-14 2xl:px-20 lg:py-4 2xl:py-4 text-sm md:text-md lg:text-md 2xl:text-lg rounded-md md:rounded-lg lg:rounded-lg font-bold bg-sky-500 border-b-4 mb-2 border-sky-800 text-white" onClick={handleCreateReport}>
                        Selesai
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                {programExercise.length > 0 ? (
                    <div className="flex flex-col justify-between items-center min-h-screen w-full ">
                        <div></div>
                        <div>
                            {((countdown > 0 || timer > 0 || restCountdown > 0) && currentExerciseIndex < programExercise.length && !showReport) && (
                                <>
                                    <p className="text-center text-xl sm:text-xl md:text-xl lg:text-2xl 2xl:text-2xl font-bold">{programExercise[currentExerciseIndex].Exercise.name}</p>
                                    <div className="aspect-video">
                                        <iframe
                                            title="YouTube Video"
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${programExercise[currentExerciseIndex].Exercise.link}}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="w-full flex flex-col justify-center items-center text-center">
                            {(countdown > 0 && (
                                <div>
                                    <p className="text-xl font-extrabold">Bersiap</p>
                                    <p className="text-4xl font-extrabold">00:{countdown}</p>
                                    <button className="py-2 px-4 lg:px-14 2xl:px-14 lg:py-4 2xl:py-4 text-md lg:text-lg 2xl:text-lg rounded-md md:rounded-lg lg:rounded-lg font-bold bg-sky-500 border-b-4 mb-2 border-sky-800 text-white" onClick={handleSkip}>Skip</button>
                                </div>
                            )) ||
                                (timer > 0 && (
                                    <div>
                                        <p className="text-4xl font-extrabold">00:{timer}</p>
                                        <button className="py-2 px-4 lg:px-14 2xl:px-14 flex gap-1 just4fy-center items-center lg:py-4 2xl:py-6 text-md lg:text-lg 2xl:text-lg rounded-md md:rounded-lg lg:rounded-lg font-bold bg-sky-500 border-b-4 mb-2 border-sky-800 text-white" onClick={handleToggleTimer}>
                                            <span><img className="w-6" src={isTimerRunning ? Pause : Resume} alt="" /></span>{isTimerRunning ? "Pause" : "Resume"}
                                        </button>
                                    </div>
                                )) ||
                                (restCountdown > 0 && (
                                    <div>
                                        <div className="flex justify-center items-center gap-2">
                                            {(allExercisesCompleted && showReport) ? (
                                                <ReportView
                                                    totalExercises={totalExercises}
                                                    stopwatchSeconds={stopwatchSeconds}
                                                />
                                            ) : (
                                                <div className="w-full flex flex-col justify-center items-center text-center">
                                                    <p className="text-xl font-extrabold">Istirahat</p>
                                                    <p className="text-4xl font-extrabold">00:{restCountdown}</p>
                                                    <div className="flex justify-center items-center gap-2">
                                                        <button
                                                            className="py-2 px-4 lg:px-14 2xl:px-20 lg:py-4 2xl:py-4 text-sm md:text-md lg:text-md 2xl:text-lg rounded-md md:rounded-lg lg:rounded-lg font-bold bg-sky-500 border-b-4 mb-2 border-sky-800 text-white"
                                                            onClick={() => {
                                                                if (allExercisesCompleted) {
                                                                    setShowReport(true);
                                                                } else {
                                                                    handleNextExercise();
                                                                }
                                                            }}
                                                        >
                                                            {allExercisesCompleted ? "Selesai" : "Lanjut"}
                                                        </button>

                                                        <button
                                                            className="py-2 px-4 lg:px-14 2xl:px-14 lg:py-4 2xl:py-4 text-md lg:text-lg 2xl:text-lg rounded-md md:rounded-lg lg:rounded-lg font-bold bg-sky-500 border-b-4 mb-2 border-sky-800 text-white"
                                                            onClick={handleRepeatExercise}
                                                        >
                                                            Ulang
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div></div>
                    </div>
                ) : (
                    <p>Tidak ada exercise untuk program ini.</p>
                )}
            </div>
        </>
    );
};

export default StartProgram;
