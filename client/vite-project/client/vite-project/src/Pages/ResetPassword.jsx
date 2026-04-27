import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const { token } = useParams(); 
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/auth/reset-password", { 
                token, 
                newPassword 
            });
            toast.success(data.message);
            navigate("/"); 
        } catch (err) {
            toast.error(err.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-xl rounded-2xl w-96">
                <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
                <form onSubmit={handleReset}>
                    <input 
                        type="password" 
                        placeholder="Enter New Password" 
                        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none" 
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;