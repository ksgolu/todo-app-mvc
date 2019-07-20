const dbConn = require('../databases/sqlite.js');
const User = dbConn.users;
const List = dbConn.lists;


const addTodo = (req,res) =>
{
  const {todo} = req.body;
  console.log('here is ----\n',todo);
  console.log(req.session.user);
  List.create({
    item:todo,
    edit:false,
    done:'no',
    user_id: req.session.user,
    });
  listTodo(req,res);
}

const listTodo = (req,res) =>
{
   console.log('getting your list and rendering profile- from mainController')
    console.log(req.session.userName)
  user = req.session.user
  List.findAll({
    where:{user_id: user},
    }).then((list)=>
    {
      //lists = list.map(item=>{return item.dataValues.item})
      return res.render('profile',{list:list, userName:req.session.UserName});
    }); 
    
    
}

const deleteTodo = (req,res)=>
{
  List.destroy({
    where:{
      item:req.body.text,
      }
    }).then((deleted)=>
    {
      console.log(deleted);
      return res.redirect('/');
    });;
  
}
const doneTodo = (req,res) =>
{
  List.update(
    {done:'yes'},
    { where:{ item:req.body.text}}
    ).then(()=>
    {
       return res.redirect('/');
    });
}

module.exports =
{
  addTodo, 
  listTodo,
  deleteTodo,
  doneTodo
};