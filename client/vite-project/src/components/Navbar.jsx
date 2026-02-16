import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, X, Receipt, Users, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    // LocalStorage se user ka data nikalna
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate('/');
    };

    // Role ke mutabiq dashboard link set karna
    const getDashboardLink = () => {
        if (role === 'admin') return '/admin';
        if (role === 'manager') return '/manager';
        return '/employee';
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Receipt className="text-white" size={24} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                ExpenseFlow
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {token ? (
                            <>
                                <Link to={getDashboardLink()} className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                                
                                {role === 'admin' && (
                                    <Link to="/admin" className="text-gray-600 hover:text-red-600 font-medium flex items-center gap-1">
                                        <ShieldCheck size={18} /> Admin Panel
                                    </Link>
                                )}

                                <div className="flex items-center gap-4 border-l pl-6">
                                    <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full uppercase">
                                        {role}
                                    </span>
                                    <button 
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <div className="md:hidden bg-gray-50 border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {token ? (
                            <>
                                <Link to={getDashboardLink()} className="block px-3 py-2 text-gray-700 font-medium border-b">Dashboard</Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-red-600 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="block px-3 py-2 text-gray-700">Login</Link>
                                <Link to="/register" className="block px-3 py-2 text-blue-600 font-bold">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;