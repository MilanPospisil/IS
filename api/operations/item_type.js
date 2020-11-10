const { Func } = require("../func.js");
const { Filter } = require("../filter.js");
const { Error } = require("../error.js");
const { Entity_ops } = require("./entity_ops.js");
const { model } = require("./../model/model.js");


class Item_type {
    ops = ["metadata", "get", "update", "insert", "delete"];

    get(client, user, user_role, query, post) {
        if (user_role != "admin") return Error.no_privilleges();
        var inner_query = "SELECT * FROM item_type";
        return Filter.filter(client, query, inner_query, [], Item_type.fields);
    }

    update(client, user, user_role, query, post) {
        if (user_role != "admin") return Error.no_privilleges();
        return Func.updateOne(client, post, "item_type", "id");
    }

    insert(client, user, user_role, query, post) {
        if (user_role != "admin") return Error.no_privilleges();
        return Func.insertData(client, post, "item_type");
    }

    delete(client, user, user_role, query) {
        if (user_role != "admin") return Error.no_privilleges();
        return Func.deleteOne(client, "item_type", "id");
    }

    metadata(client, user, user_role)
    {
        if (user_role != "admin") return Error.no_privilleges();
        return Promise.resolve(model.entities.item_type);    
    }
}


module.exports.item_type = new Item_type();