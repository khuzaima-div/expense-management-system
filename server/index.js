
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

app.get("/",(req,res)=>{
 res.send({
    activeStatus:true,
    error:false
  });
})


const allowedOrigins = [
  "https://vercel.com/khuzaima-divs-projects/expense-management-system-project",
  "https://expense-management-system-mocha.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Agar origin list mein hai ya local request hai to allow karein
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy blocked this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
