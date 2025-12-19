import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }
      
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    // Check if email is valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" })
    }

    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "Email already exists" })

      // Persist user first, then issue auth cookie
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    await newUser.save()

    // Return success response (without password)
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      message: "User created successfully"
    })

  } catch (error) {
    console.error("Error in signup controller:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const login = async (req, res) => {
  // TODO: Implement login
  res.json({ message: "Login route" })
}

export const logout = async (req, res) => {
  // TODO: Implement logout
  res.json({ message: "Logout route" })
}