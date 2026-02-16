// src/components/CreateExpense.jsx
import React, { useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const CreateExpense = ({ refreshData }) => {
    const [formData, setFormData] = useState({ title: '', amount: '', date: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/expense/create', formData);
            toast.success('Expense submitted for approval!');
            setFormData({ title: '', amount: '', date: '' });
            refreshData(); // List ko update karne ke liye
        } catch (err) {
            toast.error(err.response?.data?.error || 'Submission failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold mb-4">New Expense Request</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                    type="text" placeholder="Title (e.g. Office Rent)"
                    className="border p-2 rounded" required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <input 
                    type="number" placeholder="Amount"
                    className="border p-2 rounded" required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
                <input 
                    type="date"
                    className="border p-2 rounded" required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
            </div>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Submit Request
            </button>
        </form>
    );
};
export default CreateExpense ;