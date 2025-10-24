import express from "express";
const router = express.Router();
import passport from "passport";
import {
  renderRegisterForm,
  registerUser,
  renderLoginForm,
  loginUser,
  userLoggedOut
} from "../controllers/users.controllers.js";
import { saveRedirectUrl } from "../Middleware/Authenticate.js";

router.route("/signup").get(renderRegisterForm).post(registerUser);

// Login Routes
router
  .route("/login")
  .get(renderLoginForm)
  .post(
    saveRedirectUrl,
    // Passport middleware जो authentication handle करता है
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true, // Login fail होने पर flash message दे
    }),
    loginUser // Login successful होने पर यह controller redirect करता है
);

router.route("/logout").get(userLoggedOut);

export default router;
