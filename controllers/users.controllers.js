import User from '../Models/user.js'; 
import ApiError from '../config/ApiError.js';
import asyncHandler from '../config/asyncHandler.js';
import passport from 'passport'; 
import { cloudinary } from '../config/Cloudinary.js';


const renderRegisterForm = asyncHandler(async (req, res, next) => {
    res.render('Users/signup.ejs');
});

const registerUser = asyncHandler(async (req, res, next) => {
    // Default URL ko function ke bahar ya yahan define karna theek hai
    const defaultImageUrl = "https://res.cloudinary.com/dxrnkiwr9/image/upload/v1761376739/0684456b-aa2b-4631-86f7-93ceaf33303c_hdwaui.jpg";

    try {
        const { username, email, password, profile } = req.body;
        
        if (!username || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const newUser = new User({ username, email });

        if (profile) {
            Object.assign(newUser.profile, profile);
        }

        if (req.file) {
            newUser.profile.url = req.file.path;
            newUser.profile.filename = req.file.filename;
        } else {
            newUser.profile.url = defaultImageUrl;
            newUser.profile.filename = 'default_profile_placeholder';
        }

        const registeredUser = await User.register(newUser, password);
        
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); 
            }
            
            req.flash("success", `Welcome to Wanderlust, ${username}!`);
            res.redirect("/listings");
        });

    } catch (e) {
        if (e.name === 'UserExistsError') {
             req.flash("error", "Username or email is already registered.");
             return res.redirect("/users/signup");
        }
        next(e);
    }
});

// --- Login Controllers ---

const renderLoginForm = asyncHandler(async(req,res ,next)=>{
    res.render("Users/login.ejs");
})

const loginUser = (req, res, next) => {
    req.flash("success", "Welcome back to Wanderlust!");
    
    const redirectUrl = res.locals.returnTo || '/listings'; 
    delete res.locals.returnTo; 
    res.redirect(redirectUrl);
};


const renderProfile = asyncHandler(async(req ,res ,next)=>{
    const {id} = req.params;

    const user = await User.findById(id).populate("listings")

    if(!user){
        throw new ApiError(404 , "User not found");
    }
    req.flash("success" , "Your profile");
    res.render("Users/show.ejs" , {user});

});

const renderEditProfile = asyncHandler(async(req, res , next)=>{
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user){
        throw new ApiError(404 , "User not found");
    }

    res.render("Users/edit.ejs" , {user});
})

const updateProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { profile } = req.body;

    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(400 , "User not found");
    }
    if (profile) {
        Object.assign(user.profile, profile); 
    }

    if (req.file) {
        if (user.profile && user.profile.filename) {

            if (user.profile.filename !== 'default_profile_placeholder') { 
                await cloudinary.uploader.destroy(user.profile.filename);
            }
        }

        user.profile.url = req.file.path;
        user.profile.filename = req.file.filename;
    }

    await user.save();

    req.flash("success", "Profile updated successfully!");
    res.redirect(`/users/${user._id}`);
});

const userLoggedOut = (req ,res ,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err); 
        }
        req.flash("success" , "You are logged out successfully!");
        res.redirect("/listings");
    })
}


export { registerUser, loginUser , renderRegisterForm , renderLoginForm , userLoggedOut , renderProfile , renderEditProfile , updateProfile};
