import { getUserLogin } from "../fetching/user"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../assets/mascot/logo.png"
import Toogle from "../assets/icon/Navbar.png"
import Profile from "../assets/icon/user1.png"
import Button from "../components/Button"
import Home from "../assets/icon/home.png"
import Food from "../assets/icon/hamburger.png"
import Fitness from "../assets/icon/fitness.png"
import Recipe from "../assets/icon/recipe.png"
import RecipeB from "../assets/icon/recipe-book.png"
import Cancel from "../assets/icon/cancel.png"


const Navbar = () => {
    const [data, setData] = useState('null')
    const [isOpen, setIsOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const navigate = useNavigate()

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const fetchUser = async () => {
        try {
            const data = await getUserLogin()
            setData(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        const handleRouteChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);


    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/welcome')
    }

    const profile = () => {
        navigate('/profile')
    }

    return <>
        <div className="w-full p-2 gap-2 justify-between items-center text-md lg:text-lg 2xl:text-lg bg-white hidden md:flex lg:flex 2xl:flex">
            <div className="flex justify-center items-center ">
                <img className="w-2/4 md:w-[20%] lg:w-[20%] 2xl:w-[20%]" src={Logo} alt="" />
                <p className="text-sky-500 font-extrabold 2xl:text-3xl">HealtyDu</p>
            </div>
            <div className="flex justify-between items-center font-semibold gap-4 md:gap-6 lg:gap-8 2xl:gap-8 text-sm md:text-md lg:text-md 2xl:text-lg ">
                <a href="/" className={currentPath === '/' ? 'text-sky-500 font-extrabold' : ''}>Home</a>
                <a href="/recipe" className={currentPath === '/recipe' ? 'text-sky-500 font-extrabold' : ''}>Recipe</a>
                <a href="/course" className={currentPath === '/course' ? 'text-sky-500 font-extrabold' : ''}>Course</a>
                <a href="/course/me" className={currentPath === '/course/me' ? 'text-sky-500 font-extrabold' : ''}>My Course</a>
            </div>

            <div className="flex flex-row justify-center items-center gap-2 cursor-pointer" onClick={profile}>
                <img className="w-full" src={Profile} />
                <p className="text-sm md:text-md lg:text-md 2xl:text-lg font-bold">{data ? `${data.username}` : "Loading..."}</p>
            </div>
        </div>
        <div className="md:hidden lg:hidden 2xl:hidden">
            <div className={`p-4 bg-white w-full flex justify-between ${isOpen ? 'hidden' : ''}`}>
                <button onClick={toggleNavbar}><span><img src={Toogle} /></span></button>
                <div className="flex flex-row justify-center items-center gap-2">
                    <img className="w-[10%] rounded-full" src={Profile} />
                    <p className="font-bold">{data ? `${data.username}` : "Loading..."}</p>
                </div>
            </div>
            {isOpen && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-50"></div>
                    <div className="text-black flex flex-col justify-between min-h-screen absolute bg-white px-6 py-2 top-0 z-50">
                        <div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex justify-start items-center">
                                    <img className="w-1/5 md:w-[16%] lg:w-[20%] 2xl:w-[20%] " src={Logo} alt="" />
                                    <p className="text-sky-500 font-extrabold  text-lg md:text-lg lg:text-xl 2xl:text-2xl">HealtyDu</p>
                                </div>
                                <button onClick={toggleNavbar}><span><img className="w-4" src={Cancel} alt="" /></span></button>
                            </div>
                            <div className="text-sm md:text-md lg:text-md 2xl:text-lg mt-6">
                                <div className="flex justify-start items-start gap-4 mb-3">
                                    <img className="w-6 " src={Home} alt="" />
                                    <a className="" href="/">Beranda</a>
                                </div>
                                <div className="flex justify-start items-start gap-4 mb-3">
                                    <img className="w-6 " src={Food} alt="" />
                                    <a className="" href="/food">Makanan</a>
                                </div>
                                <div className="flex justify-start items-start gap-4 mb-3">
                                    <img className="w-6 " src={Recipe} alt="" />
                                    <a className="" href="/recipe">Resep</a>
                                </div>
                                <div className="">
                                    <div className="flex justify-start items-start gap-4 mb-3">
                                        <img className="w-6 " src={Fitness} alt="" />
                                        <a className="" href="/course">Kursus</a>
                                    </div>
                                    <div className="ml-6">
                                        <a href="/course/me" className="px-8 py-2">Kursus Saya</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <Button
                                onClick={logOut}
                                text="Logout"
                                border="border-red-700"
                                bg="bg-red-500"
                                width="w-full"
                            />
                        </div>
                    </div>
                </>
            )}
        </div >
    </>
}

export default Navbar