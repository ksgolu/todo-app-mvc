console.log('Main route start..');
const express = require('express');
const router = express.Router();
// const session = require('express-session');

const middle = require('../controllers/middle')
const mainController = require('../controllers/mainController');
const loginController = require('../controllers/loginController');
const todoController = require('../controllers/todoController');

router.route('/signin').get(middle.redirectProfile);
router.route('/signup').get(middle.redirectProfile);

router.route('/signin').get(mainController.signin);
router.route('/signup').get(mainController.signup);
router.route('/signout').get(loginController.signout);

router.route('/signin').post(loginController.signin);
router.route('/signup').post(loginController.signup);

router.route('/').get(mainController.profile);
router.route('/').post(todoController.addTodo);
router.route('/add').post((req,res)=>res.redirect('/'));

router.route('/done').post(todoController.doneTodo);
router.route('/delete').post(todoController.deleteTodo);
//router.route('/update').post(todoController);



module.exports = router