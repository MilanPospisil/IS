var { client } = require("./connection_string.js");

class Connection {
    client;

    connect() {
        this.client = client;
        this.client.connect();
    }
}


module.exports.connection = new Connection();
module.exports.client = function () {
    return module.exports.connection.client;
}