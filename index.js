import dotenv from "dotenv"
import express from 'express';
const app = express();
const port = 3000;
import mongoConnect from './config/MongoConnect.js';
import path from "path"
import ListingRoutes from "./Routes/listings.routes.js"
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import engine from "ejs-mate"
import session from "express-session"
import MongoStore from "connect-mongo"
import flash from "connect-flash"
import User from './Models/user.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import ApiError from './config/ApiError.js';
import ReviewsRouter from "./Routes/reviews.routes.js";
import UserRouter from "./Routes/user.routes.js"

if(process.env.NODE_ENV != "production"){
  dotenv.config();
}

mongoConnect();

app.set("view engine", "ejs");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl : process.env.MONGO_URI,
  crypto : {
    secret : process.env.SECRET
  },
  touchAfter : 24 * 3600
})

store.on("error", ()=>{
  console.log("ERROR on MongoDB" , err);
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currentUser = req.user; 
  next();
});

app.use("/listings", ListingRoutes);
app.use("/listings/:id/reviews", ReviewsRouter);
app.use("/users", UserRouter)



app.use((req ,res , next)=>{
  next(new ApiError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.render('error/pageNotFound.ejs', { err });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 