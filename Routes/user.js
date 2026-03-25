const express = require("express");
const user= require("../models/users");
const passport = require("passport");
const { saveRedirect } = require("../middleware");

const usercontroller=require("../controllers/user")



const router = express.Router();

//send the tamplete for singin route
router.get("/singin",usercontroller.usersingin)

//add tha database user information route
router.post("/singin",usercontroller.usersinginp);


//send the tamplete for login route
router.get("/login",usercontroller.userloging)

router.post("/login", saveRedirect ,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    req.flash("success", "Welcome! You are successfully log in.");
   res.redirect(res.locals.redirectur||"/listings");
  }
);

//logout route

router.post("/logout", usercontroller.userlogut);



module.exports = router;