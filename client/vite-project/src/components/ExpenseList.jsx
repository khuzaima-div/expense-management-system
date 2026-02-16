const ExpenseList = ({ expenses }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-700">
                    <tr>
                        <th className="p-4 border-b">Title</th>
                        <th className="p-4 border-b">Amount</th>
                        <th className="p-4 border-b">Date</th>
                        <th className="p-4 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((exp) => (
                        <tr key={exp._id} className="hover:bg-gray-50 transition">
                            <td className="p-4 border-b">{exp.title}</td>
                            <td className="p-4 border-b">Rs. {exp.amount}</td>
                            <td className="p-4 border-b">{new Date(exp.date).toLocaleDateString()}</td>
                            <td className="p-4 border-b">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    exp.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    exp.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {exp.status.toUpperCase()}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;