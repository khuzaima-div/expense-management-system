import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Check, X, ClipboardCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
    const [pendingExpenses, setPendingExpenses] = useState([]);
    const navigate = useNavigate();

    // 1. Pending Expenses mangwane ka function
    const fetchPending = async () => {
        try {
            const { data } = await api.get('/expense/pending');
            setPendingExpenses(data); 
        } catch (err) {
            toast.error("Pending request");
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleAction = async (id, status) => {
        try {
            await api.put(`/expense/update/${id}`, { status });
            toast.success(`Expense ${status} successfully!`);
            fetchPending(); 
        } catch (err) {
            toast.error("Action fail ho gaya");
        }
    };

   

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-sm">
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-800">
                        <ClipboardCheck /> Manager Approval Panel
                    </h1>
                  
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-4">Employee</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pendingExpenses.length > 0 ? pendingExpenses.map((exp) => (
                                <tr key={exp._id} className="hover:bg-blue-50 transition">
                                    <td className="p-4 font-medium">{exp.employee?.name || 'Unknown'}</td>
                                    <td className="p-4 text-gray-600">{exp.title}</td>
                                    <td className="p-4 font-bold text-gray-800">Rs. {exp.amount}</td>
                                    <td className="p-4 text-sm text-gray-500">{new Date(exp.date).toLocaleDateString()}</td>
                                    <td className="p-4 flex justify-center gap-3">
                                        <button 
                                            onClick={() => handleAction(exp._id, 'approved')}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center gap-1 shadow-sm"
                                        >
                                            <Check size={16} /> Approve
                                        </button>
                                        <button 
                                            onClick={() => handleAction(exp._id, 'rejected')}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 shadow-sm"
                                        >
                                            <X size={16} /> Reject
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-gray-400 font-medium">
                                        No pending requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;