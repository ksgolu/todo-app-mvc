//ts-check


// const session = require('express-session');
// const express = require('express');
//const cookieParser = require('cookie-parser')
//const app = express();


const dbConn = require('../databases/sqlite.js');
const User = dbConn.users;
const List = dbConn.lists;

const signin = (req,res) =>
{
  
  const {email, password } = req.body;
 
  if(!(email && password))
    return res.render('signin',{
      msg: 'please fill all require  field'
      });
  else
  {
    User.findOne({
      where : {
        email: email
      }
    }).then((user) => {
      if(user.dataValues.password === password)
      {
         console.log('you logged-in session start & redirect to profile- from loginController')
        console.log('user info',user.dataValues.name);
       // console.log('cookie - ',res.cookie)
        req.session.user = user.dataValues.id;
         req.session.UserName = user.dataValues.name;
        return res.redirect('/');
      }
      else
      {
        return res.redirect('/signin')
      }
        
    }).catch((e)=>{ return res.redirect('/signin')});
    
      //
      //return res.render('profile',{list:[1,2,3]})
  }
}

const signup = (req,res) =>
{
  const {name, email, password } = req.body;

  if(!(email && password))
    return res.render('signup',{
      msg: 'please fill all require  field'
      });
  else
  {   
    //req.session.name = name;
    
    //req.session.password = password;
  
    User.create({
      name:name,
      email:email,
      password:password}
      )
      .then((user)=>
      {
        req.session.user = user.dataValues.id;
        req.session.UserName = user.dataValues.name;
         return res.redirect('/');
      })
      .catch((e)=> res.redirect('/signup'))
    
     //return res.render('profile',{list:[1,2,3]})
  }
}

const signout = (req,res)=>
{
  req.session.destroy((err)=>
  {
    if(err)
      return console.log(err);
      
      //console.log('cookie - ',res.cookie);
      res.clearCookie('user_sid')
       return res.redirect('/')
  });
 
}
module.exports={
 signin:signin,
 signup:signup,
 signout:signout,
}
