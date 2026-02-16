import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import {  PlusCircle, ClipboardList ,LogOut} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({ title: '', amount: '', date: '' });
    const navigate = useNavigate();

    const fetchExpenses = async () => {
        try {
            const { data } = await API.get('/expense/my-expenses');
            setExpenses(data.expenses);
        } catch (err) {
            toast.error("Data load nahi ho saka");
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // 2. Expense Submit Karne Ka Logic (createExpense)
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Bheja jane wala data:", formData);
        try {
            await API.post('/expense/create', formData);
            toast.success('Expense request submitted! ');
            setFormData({ title: '', amount: '', date: '' });
            fetchExpenses(); // List refresh karne ke liye
        } catch (err) {
            toast.error(err.response?.data?.error || "Submission failed");
        }
    };

  

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <ClipboardList /> Employee Dashboard
                    </h1>
                    
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Submission Form [cite: 17, 30] */}
                    <div className="lg:col-span-1">
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <PlusCircle size={20} className="text-blue-600" /> New Request
                            </h2>
                            <div className="space-y-4">
                                <input 
                                type="text" placeholder="Title (e.g. Client Meeting) [cite: 31]"
                                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.title} required
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                                <input 
                                    type="number" placeholder="Amount [cite: 31]"
                                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.amount} required
                                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                />
                                <input 
                                    type="date" 
                                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.date} required
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                />
                                <button className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition">
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Expense History Table [cite: 18, 37] */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b">
                                <h2 className="font-bold text-gray-700">My Expense Requests</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600 text-sm">
                                            <th className="p-4">Title</th>
                                            <th className="p-4">Amount</th>
                                            <th className="p-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {expenses.map((exp) => (
                                            <tr key={exp._id} className="hover:bg-gray-50">
                                                <td className="p-4 text-gray-800 font-medium">{exp.title}</td>
                                                <td className="p-4 text-gray-600">Rs. {exp.amount}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                        exp.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                        exp.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {exp.status.toUpperCase()} [cite: 35]
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;