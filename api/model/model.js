class Model {
    entities = new Entities();
};

class Entities {
    item_type = new Item_type();
    app_user = new App_user();
    role_type = new Role_type();
    ingredients = new Ingredients();
    store = new Store();
    order = new Order();
    order_item = new Order_item();
};

class Item_type {
    fields = new Item_type_fields();
};

class Item_type_fields {
    id = { type: 'int', key: true, autogenerated: true };
    name = { type: 'text' };
    is_sellable = { type: 'boolean' };
    amount_type = { type: 'text' };
    buy_cost = { type: 'numeric' };
    sell_price = { type: 'numeric' };
};

class App_user {
    fields = new App_user_fields();
};

class App_user_fields {
    id = { type: 'int', key: true, autogenerated: true };
    name = { type: 'text' };
    password = { type: 'text' };
    email = { type: 'text' };
    name = { type: 'text' };
    phone = { type: 'text' };
    role = { type: 'text', references: { table: 'role_type', field: 'name', onDelete: 'cascade' } };
    address = { type: 'text' };
    full_name = { type: 'text' };
};

class Role_type {
    fields = new Role_type_fields();
};

class Role_type_fields {
    name = { type: 'text', key: true };
};

class Ingredients {
    fields = new Ingredients_fields();
};

class Ingredients_fields {
    id = { type: 'int', key: true, autogenerated: true };
    item_in = { type: 'int', references: { table: 'item_type', field: 'id', onDelete: 'cascade' } };
    item_out = { type: 'int', references: { table: 'item_type', field: 'id', onDelete: 'cascade' } };
    amount = { type: 'decimal' };
};

class Store {
    fields = new Store_fields();
};

class Store_fields {
    id = { type: 'int', key: true, autogenerated: true };
    item_type = { type: 'int', references: { table: 'item_type', field: 'id', onDelete: 'cascade' } };
    amount = { type: 'decimal' };
    expiration_date = { type: 'timestamp' };
};

class Order {
    fields = new Order_fields();
};

class Order_fields {
    id = { type: 'int', key: true, autogenerated: true };
    customer = { type: 'int', references: { table: 'app_user', field: 'id', onDelete: 'cascade' } };
    total_cost = { type: 'decimal' };
    delivery_from = { type: 'timestamp' };
    delivery_to = { type: 'timestamp' };
    email = { type: 'text' };
    address = { type: 'text' };
    phone = { type: 'text' };
};

class Order_item {
    fields = new Order_item_fields();
};

class Order_item_fields {
    id = { type: 'int', key: true, autogenerated: true };
    order = { type: 'int', references: { table: 'order', field: 'id', onDelete: 'cascade' } };
    item = { type: 'int', references: { table: 'item_type', field: 'id', onDelete: 'cascade' } };
    cost = { type: 'decimal' };
    amount = { type: 'decimal' };
};



module.exports.model = new Model();