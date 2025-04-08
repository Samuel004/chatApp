import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill in all the fields!!" });
        }
        if (password.length < 10) {
            return res.status(400).json({ message: "Password must be atleast 10 characters!!" });
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email exists already!" })
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPass,
        })
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,

            });

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    }
    catch (error) {
        console.log("Error:", error.message);
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Email!!" })
        }
        const isPass = await bcrypt.compare(password, user.password);
        if (!isPass) {
            return res.status(400).json({ message: "Invalid password!!" })
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilepic: user.profilepic,
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Server Error!!" });
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully!!" });
    }
    catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Server Error!!" });
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { profilepic } = req.body
        const userId = req.user._id;

        if (!profilepic) {
            return res.status(400).json({ message: "Profile pic required!!" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilepic: uploadResponse.secure_url }, { new: true });
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error while updating the profile:", error.message);

    }
}

export const checkAuth = (req, res) => {
    try {

        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error while checking authorization in controller")
        console.log("Error :", error.message);

    }
}
