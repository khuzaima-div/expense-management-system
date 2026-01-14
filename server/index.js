
require("dotenv").config();

const express = require("express");
const connectDB = require("./Db/connectDB");
 const cors = require("cors");
const authRouter= require("./routes/authRoutes");
const ExpenseRouter=require("./routes/expenseRoutes")
const adminRoutes = require("./routes/adminRouths")
const path =require("path")


const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));

app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/expense",ExpenseRouter);
app.use("/api/admin", adminRoutes)



app.get("/", (req, res) => {
  res.send("Expense Approval System API Running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
