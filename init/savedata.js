// mongoose और models को import करें
import mongoose from "mongoose";
import Listing from "../Models/listing.js";
import initData from "./data.js";

const MongoUri = "mongodb://127.0.0.1:27017/WonderlustRahul";

// MongoDB से कनेक्ट करने का फंक्शन
const mongoConnect = async () => {
    await mongoose.connect(MongoUri)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB:", err);
        });
}

// कनेक्शन शुरू करें
mongoConnect();

// डेटाबेस को initialize करने का फंक्शन
const initDB = async () => {
    await Listing.deleteMany({});
    
    // FIX: map() का उपयोग करके 'owner' ID को जोड़ें
    // और परिणाम को एक नए variable में स्टोर करें (newInitData)
    let newInitData = initData.map((obj) => ({
        ...obj,
        // अपनी Hardcoded User ID डालें
        owner: "68f8f1f775b621ec36fc4989" 
    }));

    // FIX: insertMany में नया array (newInitData) पास करें
    await Listing.insertMany(newInitData);
    
    console.log("Database initialized with sample data");
    // डेटा इंसर्ट होने के बाद कनेक्शन क्लोज करें
    mongoose.connection.close();
}

// initialize फंक्शन को चलाएँ
initDB();
