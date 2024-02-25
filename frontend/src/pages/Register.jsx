import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/Input";
import { registerUser } from "../fetching/user";
import Tiger from "../assets/mascot/logo2.png"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [role, setRole] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[0-9])(?=.*[A-Z])/;
        return regex.test(password);
    };

    const handleSubmit = async () => {
        if (password !== confirmPassword || !validatePassword(password)) {
            setIsValid(false);
            return;
        }

        try {
            await registerUser(
                name,
                email,
                username,
                password,
            );
            toast.success("Registrasi berhasil! Silakan login.");
            navigate("/login");
        } catch (e) {
            const errorMessage = e?.message || "An error occurred. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <div className="bg-[#F8FEFF] flex flex-col justify-center items-center min-h-screen">
            <div className="w-10/12 md:w-4/5 lg:w-4/12 2xl:w-4/12 flex flex-col h-fit p-6 text-center">
                <div className="flex flex-col justify-center items-center">
                    <img className="w-[40%] md:w-[25%] lg:w-[27%] 2xl:w-[30%] mb-2" src={Tiger} alt="" />
                    <h1 className="text-xl sm:text-xl md:text-xl lg:text-2xl 2xl:text-2xl font-extrabold mb-6 md:mb-8 lg:mb-10 2xl:mb-10">Daftar</h1>
                </div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                    className="border border-[#BFBFBF] mb-2 md:mb-6 lg:mb-6 2xl:mb-6 text-md lg:text-lg 2xl:text-xl text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-[#BFBFBF] mb-2 md:mb-6 lg:mb-6 2xl:mb-6 text-md lg:text-lg 2xl:text-xl text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                    required
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border border-[#BFBFBF] mb-2 md:mb-6 lg:mb-6 2xl:mb-6 text-md lg:text-lg 2xl:text-xl text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border border-[#BFBFBF] mb-2 md:mb-6 lg:mb-6 2xl:mb-6 text-md lg:text-lg 2xl:text-xl text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                    required
                />
                <div className="text-red-500 text-left text-sm">
                    * Password setidaknya harus mengandung huruf besar dan angka.
                </div>
                {!isValid && (
                    <div className="text-red-500 text-left text-sm">
                        Password setidaknya harus mengandung huruf besar dan angka.
                    </div>
                )}
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Konfirmasi Password"
                    className="border border-[#BFBFBF] mb-2 md:mb-6 lg:mb-6 2xl:mb-6 text-md lg:text-lg 2xl:text-xl text-black rounded-md w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                    required
                />
                {/* <Input value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"></Input> */}
                {password !== confirmPassword && (
                    <div className="text-red-500 text-left mb-4 text-sm">
                        The password does not match.
                    </div>
                )}
                <button type="submit" onClick={handleSubmit} className="w-full mt-4 py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Daftar</button>
                <h1 className="text-md text-gray-600 font-black my-2 md:my-2 lg:my-4 2xl:my-4">Atau</h1>
                <div className="w-full py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-gray-600 font-extrabold border-b-4 border-2 border-[#BFBFBF] border-b-gray-400 bg-white rounded-md">
                    <a href="/login">Masuk</a>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Register