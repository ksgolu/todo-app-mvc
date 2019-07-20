//---------------Importing section----------------------------------------

const express = require("express");
const session = require('express-session');
//const cookieParser = require('cookie-parser');
// const router = express.Router();
const app = express();
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const mainRoutes = require("./backend/routes/MainRoutes");

//app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
app.use(session({
   key: 'user_sid',
  secret: 'KonfinitySecretKey',  
  resave: false,
  saveUninitialized: false,
  cookie:{ok:true},
  })
  );

app.set("views", __dirname + "/client/views"); //line5

// ejs - for rendering ejs in html format
app.engine("html", require("ejs").renderFile); //Line6

// setting view-engine as ejs
app.set("view engine", "ejs"); //Line7

app.use(express.static(path.resolve(__dirname, "client"))); //Line8

// // for logging purposes
// app.use(logger("dev"));



// function sc(req, res, next){
//     if (req.session.user && req.cookies.user_sid) {
//       app.use()
//     } else {
//         res.redirect('/signin')
//     }    
// };

app.use("/",mainRoutes);
// app.use((req,res)=>
// {
//   console.log(req.body);
  
// })

 
// app.use('/',(req,res)=>
// {
//   if(req.session.page_views)
//   {
//     app.use('profile',mainRoutes)
//     }
//     else
//     {
//       app.use('signup', mainRoutes)
//       }
//   });


app.set("port", process.env.PORT || 4000); //Line11
app.listen(app.get("port"), () => {
  //Line12
  console.log("Application running in port: " + app.get("port"));
});

module.exports = app;