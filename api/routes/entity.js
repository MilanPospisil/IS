var express = require('express');
const { Func } = require('../func');
var router = express.Router();

var {Entity_ops} = require('../operations/entity_ops.js');

router.get('/', function(req, res, next) {
    debugger;
    //Func.json(res, {text : "JOOOO"});
    Entity_ops.run(req, "get");
});

router.post('/', function(req, res, next) {
    Entity_ops.run(req, "post");
});

module.exports = router;
