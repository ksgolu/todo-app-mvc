const Sequelize = require('sequelize');
//console.log(__dirname)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname+ '/database.sqlite'
  });
  
  //defining schema
  
  const users = sequelize.define('user',{
    // id:{
    //     type:Sequelize.NUMBER, //no-need to specify
    //   //allowNull:false,
    //   primaryKey:true,
    //   },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
      },
    password:{
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
    
    
    const lists = sequelize.define('lists',{
    // id:{
    //   type:Sequelize.NUMBER, //no-need to specify
    //   //allowNull:false,
    //   primaryKey:true,
    //   },
    item:{
        type: Sequelize.STRING,
        allowNull: false,
      },
    edit:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
    done:{
        type: Sequelize.STRING,
        allowNull:false,
      },
    user_id:{
      type: Sequelize.NUMBER,
      allowNull: false,
      },
    });
    
    sequelize
      .sync()
      .then(() =>console.log('created sucessfully'))
      .catch((e)=>console.log('error occur while creating database'))
    
    
    module.exports = {
      users:users,
      lists:lists
      }
