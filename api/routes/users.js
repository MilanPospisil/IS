var express = require('express');
var router = express.Router();
const { Func }	= require('./../func.js');

const { Users }	= require('../operations/users_op.js');
const { client }	= require('./../connection.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get_user', function(req, res, next) {
  Func.json(res, {user : req.session.user, user_name : req.session.user_name, role : req.session.role} );
});

router.post('/login', function(req, res, next) {
  Users.login(client(), req.body.user, req.body.password)
  .then(a => {
    if (a)
    {
      req.session.user = req.body.user;
      req.session.role = a.role;
      req.session.user_name = a.user_name;
      Func.json(res, {success : true, user: req.session.user, role: req.session.role, user_name : req.session.user_name});
    }else
    {
      Func.json(res, {success : false});
    }
  })
  
  
});

router.post('/logout', function(req, res, next) {
  req.session.user = null;
  Func.json(res, {success : true});
});

module.exports = router;
