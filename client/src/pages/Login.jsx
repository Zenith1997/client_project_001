import React, {useState} from 'react';
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({email: '', password: ''});
    const {email, password} = user;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, user);

            setSuccess("Login successful")
            setTimeout(() => {
                setSuccess(null);
            }, 5000);

            if (res) {
                localStorage.setItem('userName', res?.data.Username);
                localStorage.setItem('isAdmin', true);
                window.location.href = '/admin';
            }
        } catch (err) {
            setError(err?.response?.data);
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-900">
            <div className="bg-gray-800 shadow-lg rounded-lg p-4 md:p-8">
                <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            name="email"
                            className="bg-gray-900 text-white border border-gray-700 rounded w-full min-w-[275px] py-2 px-3 focus:outline-none focus:border-gray-500"
                            type="email"
                            placeholder="Enter your email"
                            required={true}
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            name="password"
                            className="bg-gray-900 text-white border border-gray-700 rounded w-full min-w-[275px] py-2 px-3 focus:outline-none focus:border-gray-500"
                            type="password"
                            placeholder="Enter your password"
                            required={true}
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 py-2 px-4 mt-2 w-full rounded mb-4"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
