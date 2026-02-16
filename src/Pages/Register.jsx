import React, { useState } from 'react';
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        role: 'employee' 
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/register', formData);
            
            toast.success("Account Create Succesfully");
            navigate('/'); 

        } catch (err) {
            toast.error(err.response?.data?.message || "Registration fail!");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl border">
                <h2 className="text-3xl font-extrabold text-center mb-6">Create Account</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded"
                        onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    
                    <input type="email" placeholder="Email Address" required className="w-full p-3 border rounded"
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    
                    <input type="password" placeholder="Password" required className="w-full p-3 border rounded"
                        onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    
                    <select className="w-full p-3 border rounded" 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">
                        Register Now
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already Create Account <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;