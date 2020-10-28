var express = require('express');
var router = express.Router();
const { Func }	= require('./../func.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get_user', function(req, res, next) {
  
  
  Func.json(res, {user : req.session.user, user_name : req.session.user_name} );
});

router.post('/login', function(req, res, next) {
  req.session.user = req.body.user;

  Func.json(res, {success : true, user: req.session.user});
});

router.post('/logout', function(req, res, next) {
  req.session.user = null;
  
  Func.json(res, {success : true});
});

module.exports = router;
