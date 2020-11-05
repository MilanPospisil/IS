const {Func} = require("../func.js");
const {Filter} = require("../filter.js");

class Item_type {
    static ops = ["get"];
    static entity_schema = {fields : ["name", "is_sellable", "id", "amount_type", "buy_cost", "sell_price"]};

    static get(client, user, user_role, query)
    {
        var inner_query = "SELECT * FROM item_type";
        return Filter.filter(client, query,  inner_query, [], Item_type.entity_schema);      
    }
}


module.exports.Item_Type = Item_type;