import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MongoUri = process.env.MONGO_URI  

const mongoConnect = async ()=>{
   await mongoose.connect(MongoUri)
   .then(()=>{
        console.log("Connected to MongoDB");
   })
   .catch((err)=>{
        console.log("Error connecting to MongoDB:", err);
   });
}

export default mongoConnect;