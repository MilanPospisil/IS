
const {Func} = require("./../func.js");
var md5 = require('md5');

class Users {
    static login(client, user, password) {

        var hash = md5(password);
        var params = [user, hash];
        return Func.query(client, "SELECT * FROM app_user WHERE name = $1 AND password = $2", params)
        .then(a => {
            if (a.rows.length > 0)
            {
                return {role : a.rows[0]["role"], user : a.rows[0]["name"], user_name : a.rows[0]["full_name"]};
            }else
            {
                return false;
            }
        });
    }
}


module.exports.Users = Users;