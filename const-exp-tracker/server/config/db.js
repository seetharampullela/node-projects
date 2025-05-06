import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    console.log("process.env.MONGO_URI", process.env.MONGO_URI);
    const con = await mongoose.connect(
      "mongodb+srv://saiprasadarigela:T9XGBCIbNsngT4Kq@cluster0.dajxvo4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
