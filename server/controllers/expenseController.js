
const Expense = require("../models/Expense");

// 1. Create a new expense
const createExpense = async (req, res) => {
    const { title, amount, date } = req.body;
    try {
        const expense = await Expense.create({
            title,
            amount,
            date,
            employee: req.user.id 
        });
        res.status(201).json({ message: "Expense Submitted", expense });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. My Expense Logic
const getMyExpenses = async (req, res) => {
    try {
        // Spelling theek: employee
        const expenses = await Expense.find({ employee: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ expenses });
    } catch (error) {
        // Agar req.user.id na mile to 500 error aata hai
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 3. Manager Pending Logic
const getPendingExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ status: "pending" })
            .populate("employee", "name email") // Ab ye kaam karega kyunke spelling sahi hai
            .sort({ createdAt: -1 });

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 4. Update Status Logic
const updateExpenseStatus = async (req, res) => {
    try {
        const { status } = req.body; 
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        expense.status = status;
        await expense.save();

        res.json({ message: `Expense ${status} successfully`, expense });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createExpense, getMyExpenses, getPendingExpenses, updateExpenseStatus };