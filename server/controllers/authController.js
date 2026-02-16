const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Aapka Gmail
        pass: process.env.EMAIL_PASS  // Gmail App Password (Normal password nahi)
    }
});
// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token and role for easier frontend handling
    res.status(200).json({ message: "Login Successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// ================= FORGET PASSWORD =================
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const token = Math.random().toString(36).substring(2, 15);
        user.resetToken = token;
        user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
        await user.save();

        // Email Content
        const resetUrl = `http://localhost:5173/reset-password/${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2>Password Reset</h2>
                    <p>Aapne password reset ki request ki hai. Niche diye gaye button par click karein:</p>
                    <a href="${resetUrl}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                    <p>Yeh link 10 minute mein expire ho jayega.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Reset link sent to your email!" });

    } catch (error) {
        res.status(500).json({ message: "Email sending failed", error: error.message });
    }
};

// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });

    user.password = await bcrypt.hash(newPassword, 10);

    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  register,
  login,
  forgetPassword,
  resetPassword
};
