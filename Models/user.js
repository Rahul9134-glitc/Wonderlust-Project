import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    listings : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Listing"
        }
    ],       
    profile : {
        url : String,
        filename : String,
        firstName : String,
        lastName : String,
        bio : String,
        location : String,
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;