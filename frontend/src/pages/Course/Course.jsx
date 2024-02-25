import { useState, useEffect } from "react"
import { getAllCourse } from "../../fetching/course"
import { getUserLogin } from "../../fetching/user"
import { useNavigate } from "react-router-dom"
import CourseBox from "../../components/Course"
import Loading from "../../components/Loading"
import Navbar from "../../components/Navbar"

const Course = () => {
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState([])
    const [coursePrivate, setCoursePrivate] = useState([])
    const [user, setUser] = useState([])
    const navigate = useNavigate();

    const fetchCourse = async () => {
        try {
            const course = await getAllCourse(1, 100, "Dada", "")
            setCourse(course.data)
            setLoading(false)
            console.log(course.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUser = async () => {
        try {
            const user = await getUserLogin()
            setUser(user.data)
            console.log("User", user.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCoursePrivate = async () => {
        try {
            const coursePrivate = await getAllCourse(1, 100, user.name, "")
            setCoursePrivate(coursePrivate.data)
            setLoading(false)
            console.log(coursePrivate.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchUser();
        fetchCourse();
        fetchCoursePrivate();
    }, [])

    const handleClick = (id) => {
        navigate(`/course/${id}`)
    }

    if (loading) {
        return <Loading />
    }

    return <>
        <Navbar />
        <div className="m-4">
            <p className='text-md md:text-md lg:text-md 2xl:text-lg font-bold mb-2'>Kursus Latihan Dada</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-6 2xl:gap-6 my-2">
                {course.map((map) => (
                    <div className="" key={map.id}>
                        <CourseBox bg="bg-gradient-to-br from-cyan-400 to-blue-500" name={map.name} description={map.description} onClick={() => handleClick(map.id)} />
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default Course