const Todos = require('./todoController');

function signin(req,res)
{
   console.log('rendering sign-in page- from mainController')
   // middleware function to check for logged-in users
      
   res.render('signin')
}

function signup(req,res)
{
  
    res.render('signup')
}
function profile(req,res)
{
  console.log('iam maincontroller -',req.session.user);
  if( req.session.user)
  {
    console.log('you have active session- from mainController')
    Todos.listTodo(req,res);
   // res.render('profile',{list:[1,2,3,4]});
  }
  else
  {
     console.log('you have  NO active session redirecting to signin- from mainController')
    res.redirect('/signin')
  }
}
  // console.log(req.session)
  
  function deleted(req,res)
  {
    Todos.deleteTodo(req,res);
  }
 
module.exports = {
  signin: signin,
  signup: signup,
  profile: profile,
  deleted:deleted
  }