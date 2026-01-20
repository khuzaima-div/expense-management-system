
require("dotenv").config();

const express = require("express");
const connectDB = require("./Db/connectDB");
 const cors = require("cors");
const authRouter= require("./routes/authRoutes");
const ExpenseRouter=require("./routes/expenseRoutes")
const adminRoutes = require("./routes/adminRouths")
const path =require("path");
const { error } = require("console");


const app = express();
connectDB();



const allowedOrigins = [
  "https://expense-management-system-pro-git-ed3838-khuzaima-divs-projects.vercel.app/",
  "https://expense-management-system-mocha.vercel.app",
  "http://localhost:5173" 
];

app.use(cors({
  origin: function (origin, callback) {
    // !origin checks for tools like Postman or server-side calls
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS from Origin:", origin); // Debugging ke liye console check karein
      callback(new Error("CORS policy blocked this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // OPTIONS pre-flight requests ke liye zaroori hai
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"] // Headers ko bhi allow karna zaroori hai
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
