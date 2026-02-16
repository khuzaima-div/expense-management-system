const express=require("express");
const protect= require("../middleware/auth");
const allowRoles = require("../middleware/role");


const {createExpense,getMyExpenses,getPendingExpenses,updateExpenseStatus}=require("../controllers/expenseController")


const Router=express.Router()
//    Employee routes

Router.post("/create",protect,createExpense)
Router.get("/my-expenses",protect,getMyExpenses)

//     Manager routes

Router.get("/pending", protect, getPendingExpenses);
Router.put("/update/:id", protect, updateExpenseStatus);
Router.put("/update/:id",protect,allowRoles,updateExpenseStatus);


module.exports=Router