import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, Receipt, ShieldAlert,LogOut } from 'lucide-react'; 
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [allExpenses, setAllExpenses] = useState([]);
    const [activeTab, setActiveTab] = useState('users'); 
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [userRes, expenseRes] = await Promise.all([
                api.get('/admin/users'), 
                api.get('/admin/expenses')
            ]);
            
            setUsers(userRes.data);
            setAllExpenses(expenseRes.data);
        } catch (err) {
            console.error("Fetch Error:", err);
            toast.error("Data load nahi ho saka! Check your Admin routes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="p-10 text-center font-bold">Loading Admin Data...</div>;
 
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex justify-between items-center border-b-4 border-red-600">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <ShieldAlert className="text-red-600" /> Admin Command Center
                        </h1>
                        <p className="text-gray-500">Manage users and monitor all company expenses</p>
                    </div>
                  
                </div>

                {/* Tabs Navigation */}
                <div className="flex gap-4 mb-6">
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                    >
                        <Users size={18}/> Users ({users.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('expenses')}
                        className={`px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 ${activeTab === 'expenses' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                    >
                        <Receipt size={18}/> All Expenses ({allExpenses.length})
                    </button>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    {activeTab === 'users' ? (
                        <table className="w-full text-left">
                            <thead className="bg-gray-800 text-white text-sm">
                                <tr>
                                    <th className="p-4 text-nowrap">Name</th>
                                    <th className="p-4 text-nowrap">Email</th>
                                    <th className="p-4 text-nowrap">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium">{user.name}</td>
                                        <td className="p-4 text-gray-600">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {user.role?.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-800 text-white text-sm">
                                <tr>
                                    <th className="p-4 text-nowrap">Employee</th>
                                    <th className="p-4 text-nowrap">Title</th>
                                    <th className="p-4 text-nowrap">Amount</th>
                                    <th className="p-4 text-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {allExpenses.map(exp => (
                                    <tr key={exp._id} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium">{exp.employee?.name || "Deleted User"}</td>
                                        <td className="p-4 text-gray-600">{exp.title}</td>
                                        <td className="p-4 font-bold text-gray-800">Rs. {exp.amount}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                exp.status === 'approved' ? 'bg-green-100 text-green-700' : 
                                                exp.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {exp.status?.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;