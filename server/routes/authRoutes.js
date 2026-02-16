const express= require("express");
const {register,login,forgetPassword,resetPassword}=require("../controllers/authController");
const protect= require("../middleware/auth");


const router= express.Router();

router.post('/register',register)
router.post("/login",login)
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);


router.get("/dashboard",(req,res)=>{
    res.status(200).json({message:"Welcome to the dashboard"});
});


module.exports= router;