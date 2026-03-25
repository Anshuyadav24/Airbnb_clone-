const user= require("../models/users");

module.exports.usersingin=(req,res)=>{
    res.render("./users/singin.ejs")
}

module.exports.usersinginp= async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new user({ username, email });

        const userregister=await user.register(newUser, password);

        req.logIn( userregister,(err)=>{


          if(err){
            return next(err)
          }
            req.flash("success", "Welcome! You are successfully signed up.");
        res.redirect("/listings");

        })      

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/singin");
    }
}



//login

module.exports.userloging=(req,res)=>{

    res.render("./users/login.ejs")
}


//logout
module.exports.userlogut=(req, res, next) => {
  req.logout(
    function(err) {
    if (err) return next(err);

    req.flash("success", "Logged out successfully now!");
    res.redirect("/listings");
  });
}