import User from '../Models/user.js'; 
import ApiError from '../config/ApiError.js';
import asyncHandler from '../config/asyncHandler.js';
import passport from 'passport'; 


const renderRegisterForm = asyncHandler(async (req, res, next) => {
    res.render('Users/signup.ejs');
});

const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return next(new ApiError(400, "All fields are required"));
        }

        const user = new User({ username, email });
        
        const registeredUser = await User.register(user, password);
        
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); 
            }
            
            req.flash("success", `Welcome to Wanderlust, ${username}!`);
            res.redirect("/listings");
        });

    } catch (e) {
        if (e.name === 'UserExistsError') {
             req.flash("error", "username or email is already registered.");
             return res.redirect("/signup");
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

const userLoggedOut = (req ,res ,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err); 
        }
        req.flash("success" , "You are logged out successfully!");
        res.redirect("/listings");
    })
}


export { registerUser, loginUser , renderRegisterForm , renderLoginForm , userLoggedOut};
