import { useState, useEffect } from "react"
import { getUserLogin } from "../../fetching/user"
import { getAllJoinCourse } from "../../fetching/join_course"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import CourseBox from "../../components/Course"
import Loading from "../../components/Loading"

const MyCourse = () => {
    const [join, setJoin] = useState([])
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const user = await getUserLogin()
            setUser(user.data)
            console.log("User", user.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchJoinCourse = async () => {
        try {
            const join = await getAllJoinCourse("", 100, user.id, "")
            setJoin(join.data)
            setLoading(false)
            console.log("Join", join.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (id) => {
        navigate(`/course/${id}`)
    }

    useEffect(() => {
        setLoading(true);
        fetchUser();
        fetchJoinCourse();
    }, [user.id])

    if (loading) {
        return <Loading />
    }

    return <>
        <Navbar />
        <div className="m-4">
            <p className='text-md md:text-md lg:text-md 2xl:text-lg font-bold mb-2'>Kursus Kamu</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-6 2xl:gap-6 my-2">
                {join.map((item) => (
                    <div className="" key={item.id}>
                        <CourseBox bg="bg-gradient-to-br from-cyan-400 to-blue-500" name={item.Course.name} description={item.Course.description} onClick={() => handleClick(item.course_id)} />
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default MyCourse