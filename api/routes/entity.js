var express = require('express');
const { Func } = require('../func');
var router = express.Router();

var {Entity_ops} = require('../operations/entity_ops.js');
var { connection } = require('../connection.js');

router.get('/', function(req, res, next) {
    //Func.json(res, {text : "JOOOO"});
    Entity_ops.run(connection.client, req, res, "get");
});

router.post('/', function(req, res, next) {
    Entity_ops.run(connection.client, req, res, "post");
});

module.exports = router;
