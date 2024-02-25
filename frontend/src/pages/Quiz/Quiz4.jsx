import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { updateUser } from "../../fetching/user";
import { getUserLogin } from "../../fetching/user";
import { addCourse } from "../../fetching/course";
import { createJoinCourse } from "../../fetching/join_course";
import Question from "../../components/Question";
import Answer from "../../components/Answer";
import ProgressBar from "../../components/ProgressBar";

const Quiz4 = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [height, setHeight] = useState("")
    const [nameCourse, setNameCourse] = useState("")
    const [description, setDescription] = useState("Ini adalah program latihan yang dibuat khusus untuk kamu")
    const [progress, setProgress] = useState(64);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserLogin();
                setUser(response.data);
                console.log("User >>> ", response.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            setNameCourse(`Latihan Program Khusus ${user.name}`);
        }
    }, [user]);

    const handleHeight = async () => {
        try {
            const payloadCourse = {
                name: nameCourse,
                description
            }
            const responseCourse = await addCourse(payloadCourse)

            const newCourseId = responseCourse.id;

            const payloadHeight = {
                height
            }
            const responseHeight = await updateUser(payloadHeight)

            const payloadJoin = {
                userId: user.id,
                courseId: responseCourse.id
            }

            const responseJoin = await createJoinCourse(payloadJoin)

            console.log("Response Course: ", responseCourse);
            console.log("Response Join: ", responseJoin);
            console.log(">>>>", responseHeight)

            navigate(`/quiz5?&courseId=${newCourseId}`, {
                state: { newCourseId }
            });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return <Loading />
    }

    return <>
        <div className="flex flex-col items-center py-2 justify-between min-h-screen">
            <div className="flex flex-col w-full items-center">
                <div className="my-2 w-3/4 md:w-3/5 lg:w-1/2 2xl:w-1/2 ">
                    <ProgressBar progress={progress} />
                </div>
                <div className="my-4 w-3/5 md:w-1/2 lg:w-1/3 2xl:w-1/3">
                    <Question text="Berapa tinggi badan kamu?" />
                </div>
            </div>
            <div className="w-3/5 md:w-1/2 lg:w-1/3 2xl:w-1/3">
                <Answer
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Masukkan tinggi badan kamu"
                />
            </div>
            <button onClick={handleHeight} className="px-4 py-2 mb-4 text-md lg:text-lg 2xl:text-xl text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Selanjutnya</button>
        </div>
    </>
}

export default Quiz4