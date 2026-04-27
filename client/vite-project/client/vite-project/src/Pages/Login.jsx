import React, { useState } from 'react';
import api from "../api/axios"; 
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/auth/login', formData);
            
            // Token aur Role save karna
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role); 

            toast.success(`Welcome back, ${data.role}!`);

            // Role based navigation
            if (data.role === 'admin') {
                navigate('/admin');
            } else if (data.role === 'manager') {
                navigate('/manager');
            } else {
                navigate('/employee');
            }

        } catch (err) {
            console.error("Login error details:", err);
            const errorMsg = err.response?.data?.message || "Invalid Email or Password";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
                    <p className="text-gray-500 mt-2">Expense Approval System</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="name@company.com"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                          
                        </div>
                        <input 
                            type="password" 
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-blue-300 transition-all active:scale-95"
                    >
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>
                  <Link 
                                to="/forgot-password" 
                                className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition"
                            >
                                Forgot password?
                            </Link>

                <div className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <span 
                        className="text-blue-600 font-bold cursor-pointer hover:underline" 
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;