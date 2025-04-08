import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected successfully!", con.connection.host)
    } catch (error) {
        console.log("Connection error: ", error)

    }
} 