import express from "express";
const router = express.Router();
import passport from "passport";
import multer from "multer";
import { profileStorage } from "../config/Cloudinary.js";
import {
  renderRegisterForm,
  registerUser,
  renderLoginForm,
  loginUser,
  userLoggedOut,
  renderProfile,
  renderEditProfile,
  updateProfile
} from "../controllers/users.controllers.js";
import { saveRedirectUrl ,  isLoggedIn , isProfileOwner } from "../Middleware/Authenticate.js";

const profileUpload = multer({ storage: profileStorage });

router.route("/signup").get(renderRegisterForm).post(profileUpload.single('profilePicture'),registerUser);
// Login Routes
router
  .route("/login")
  .get(renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: true,
    }),
    loginUser
);

router.route("/logout").get(userLoggedOut);
router.route("/:id")
.get(renderProfile)
.put(
  isLoggedIn,
  isProfileOwner,
  profileUpload.single('profilePicture'),
  updateProfile
)
router.route("/:id/edit").get(renderEditProfile);

export default router;
