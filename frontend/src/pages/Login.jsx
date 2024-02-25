import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, getUserLogin } from "../fetching/user";
import Input from "../components/Input";
import Tiger from "../assets/mascot/logo2.png"

const Login = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [emailOrUsername, setEmailorUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await login({
                emailOrUsername,
                password,
            });

            if (response.success) {
                const user = await getUserLogin();
                console.log(user.data)

                if (user.data.role === 'admin') {
                    navigate("/admin");
                } else if (user.data.weight !== null) {
                    navigate("/");
                } else {
                    navigate("/introduction")
                }

                toast.success("Login berhasil!");
            } else {
                toast.error("Email/Username atau Password Salah");
            }
        } catch (e) {
            toast.error("Terjadi kesalahan. Silakan coba lagi.");
            console.error(e);
        }
    };


    return (
        <div className="bg-[#F8FEFF] flex justify-center items-center min-h-screen">
            <div className="w-10/12 md:w-4/5 lg:w-4/12 2xl:w-4/12 h-fit p-6 text-center">
                <div className="flex flex-col justify-center items-center">
                    <img className="w-[40%] md:w-[25%] lg:w-[27%] 2xl:w-[30%] mb-2" src={Tiger} alt="" />
                    <h1 className="text-xl sm:text-xl md:text-xl lg:text-2xl 2xl:text-2xl font-extrabold mb-6 md:mb-8 lg:mb-10 2xl:mb-10">Masuk</h1>
                </div>
                <input
                    type="email"
                    value={emailOrUsername}
                    onChange={(e) => setEmailorUsername(e.target.value)}
                    placeholder="Email Or Username"
                    className="border border-[#BFBFBF] mb-2 md:mb-6 lg:mb-6 2xl:mb-6 text-md lg:text-lg 2xl:text-xl text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border border-[#BFBFBF] text-md lg:text-lg 2xl:text-xl text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                    required
                />
                <div className="text-left mb-6 text-md">
                    <a href="/forgot" className="text-md text-blue-400">Lupa Password?</a>
                </div>
                <button type="submit" onClick={handleSubmit} className="w-full py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Masuk</button>
                <h1 className="text-md text-gray-600 font-black my-2 md:my-2 lg:my-4 2xl:my-4">Atau</h1>
                <div className="w-full py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-gray-600 font-extrabold border-b-4 border-2 border-[#BFBFBF] border-b-gray-400 bg-white rounded-md">
                    <a href="/register">Daftar</a>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login