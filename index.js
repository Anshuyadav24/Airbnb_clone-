
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}




const express =require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const Review=require("./models/Review.js")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const { isLoggedIn } = require("./middleware.js");
//atuntection 
const passport=require(`passport`)
const localstrategy=require(`passport-local`)
const user=require("./models/users.js")
//image upload

 // path sahi se check kar

const path=require("path");
const methodOverride = require('method-override');
const ejsmate=require("ejs-mate");
const Exception = require("./Eror/Exception.js");
const wrapasync = require("./Eror/wrapasync.js");
const listingsroute=require("./Routes/listings.js")
const userroute=require("./Routes/user.js")

const reviewroute=require("./Routes/review.js")


// mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
const Dburl=process.env.MONGO_URI

app.set ("view engine","ejs");
app.set("views",  path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname ,"/public")));
// cookige-session

app.use(cookieParser());

const store = MongoStore.create({
    mongoUrl: Dburl,
      crypto:{
     secret:process.env.SECRET
      },
      touchAfter: 24*3600
});

store.on("store",()=>{

  console.log(" errorr is store session ");
})

app.use(session({
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
       maxAge: 7 * 24 * 60 * 60 * 1000, // 10 min
       httpOnly: true
      
      }
}));



app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new  localstrategy(user.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curentuser = req.user

  next();
});




// routing structurinng
app.use("/listings", listingsroute);
app.use("/", userroute);
app.use("/",reviewroute );



main()
.then(()=>{

    console.log(" Database is concection sucessfully!!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(Dburl);

}


app.listen("8080",()=>{
    console.log(" app listing for user requeest");
});

app.get("/set", (req, res) => {
  res.cookie("username", "Ankit");
  res.send("Cookie set!");
});



//err0r handling
app.all('/*', (req, res, next) => {
  next(new Exception(404, 'Page not found!!'));
});


app.use((err,req,res, next)=>{
 let {status=404,message=" some error acoure"}=err;
  res.render("error",{message});
});




 