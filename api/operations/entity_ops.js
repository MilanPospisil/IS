
const {Func} = require("../func.js");
const {Filter} = require("../filter.js");

//const {Item_type} = require("./item_type.js");

class Entity_ops {
    
    static entity_names = ["item_type"];
    
    static entities = {};

    static load()
    {
        for(e in Entity_ops.entity_names)
        {
            var e = Entity_ops.entity_names[e];
            var path = "./" + e + ".js";
            console.log("loading path " + path);
            var lib = require(path);
            var ent = lib[e];
            this.entities[e] = ent;
        }
    }

    static run(client, req, res, req_type)
    {
        var params;
        if (req_type == "post") params = req.body;
        if (req_type == "get")  params = req.query;

        var user = req.session.user;
        var role = req.session.role;

        var entity_name = params["entity_name"];
        var entity_operation = params["entity_operation"];
        var query = params["query"];
        if (!query) 
        {
            query = {};
        }
        else
        {
            query = JSON.parse(query);
        }
        // validate entity name
        if (!Entity_ops.entity_names.includes(entity_name))
        {
            var obj = {success : false, error : "entity name not found"};
            Func.json(res, obj);
            return;
        }

        // load entity
        var Entity = Entity_ops.entities[entity_name];

        // validate ops
        if (!Entity.ops.includes(entity_operation))
        {
            var obj = {success : false, error : "entity operation not found"};
            Func.json(res, obj);
            return;
        }

        // run op
        Entity[entity_operation](client, user, role, query)
        .then(a => 
        {  
            if (a.error)
            {
                Func.json(res, a);
            }else
            {
                var obj = {success : true, data : a};
                Func.json(res, obj); 
            }
        })
        .catch(err =>
        {
            var obj = {success : false, error : "unknown error"};
            Func.json(res, obj);
        });
    }
}

Entity_ops.load();


module.exports.Entity_ops = Entity_ops;