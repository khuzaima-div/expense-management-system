const User = require("../models/User");
const Expenses = require("../models/Expense");

const getAllusers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error while fetching users" });
  }
};

const getAllexpenses = async (req, res) => {
    try {
        const expenses = await Expenses.find()
            .populate("employee", "name email role")
            .sort({ createdAt: -1 }); 
            
        res.json(expenses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error while fetching expenses" });
    }
};

module.exports = { getAllusers, getAllexpenses };