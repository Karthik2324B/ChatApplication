import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {createTokenAndSaveCookie} from '../jwt/generateToken.js'

export const signup=async(req,res)=>{
    const {fullname,email,password,confirmPassword}=req.body;
    try {
        const user=await User.findOne({email})
        if(password!==confirmPassword){
            return res.status(400).json({message:"Password and confirm password do not match"})
        }
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            fullname,
            email,
            password:hashedPassword
        })
        await newUser.save()
        if(newUser){
            createTokenAndSaveCookie(newUser._id,res)
            return res.status(201).json({message:"User created successfully",newUser:newUser})
        }
    } catch (error) {
        return res.status(500).json({message:"Error while signup",error:error.message})
    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // console.log("Login attempt with:", email); // ✅ Add this
    // console.log("Found user:", user?.email); // ✅ Add this

    // 🛑 Check if user does not exist
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Now it's safe to compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    if (user) {
      createTokenAndSaveCookie(user._id, res);
      res.status(200).json({
        message: "Logged in successfully",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in logout"});
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    
    
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
    
  }
};
