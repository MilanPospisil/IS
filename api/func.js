
fs = require('fs');
//import { Client } from 'pg';

class Func
{
	static json(res, obj)
	{
		res.send(JSON.stringify(obj, null, 4));
	}

	static queryAndSend(client, sql, params, res)
	{
		return Func.query(client, sql, params)
		.then(data =>
		{
			res.send(data.rows);		
		});		
	}

	static queryAndSendOne(client, sql, params, res)
	{
		return Func.query(client, sql, params)
		.then(data =>
		{
			res.send(data.rows[0]);		
		});		
	}

	static query_JSON_and_send(client, sql, params, res)
	{
		return Func.query(client, sql, params)
		.then(data =>
		{
			var field_name = data.fields[0].name;
			var json = JSON.parse(data.rows[0][field_name])
			res.send(json);		
		});		
	}

	static modify_entity(client, entity_name, id, id_name, modify_method, fields)
	{
		var fieldsText = "*";
		var obj;
		
		if (fields)
		{
			fieldsText = "";
			fields.map((item, i) =>
			{
				if (i != 0) fieldsText += ", ";
				fieldsText += item;
			});
		}

		return Func.query(client, "SELECT " + fieldsText + "  FROM " + entity_name + " WHERE " + id_name + " = $1	", [id])
		.then(data =>
		{
			obj = data.rows[0];
			return modify_method(obj);
		})
		.then((value) =>
		{
				return Func.updateData(client, obj, entity_name,  " WHERE " + id_name + " = $1", [id]);
		});	
			
	}


	static query(client, sql, params)
	{
		Func.log(sql);
		if (params) Func.log(params);
		return new Promise((resolve, reject) => {
			return 	client.query(sql, params)
					.then((value) => {
						Func.log("Succesful: " + sql);
						resolve(value);
					})
					.catch((value) => {
						Func.log("Failed: " + sql);
						Func.log(value);
						reject(value);
					});
		});	
	}

	static getOne(client, id, tableName)
	{
		var params = [id];
		return this.query(client, "SELECT * FROM " + tableName + " WHERE id = $1", params);
	}

	static insertData(client, data, tableName)
    {
        var i = new ParamsIterator();
        var sql = "INSERT INTO " + tableName + " (";

        // names
        var first = true;
        for (var n in data)
        {
            if (!first) sql += ",";
            first = false;
            sql += n;        
        }

        sql += ") VALUES(";

		first = true;
        // values
        for (var n in data)
        {
            if (!first) sql += ",";
            first = false;
            sql += i.n(data[n]);        
		}
		
		sql += ") RETURNING *;";

		/*Func.log(sql);
		Func.log(i.params);
*/
		return Func.query(client, sql, i.params);
	}

	static deleteData(client, tableName, whereSql, params)
    {
        var sql = "DELETE FROM " + tableName + " ";
		whereSql = i.convertQuery(whereSql);
		sql += " " + whereSql;
		return Func.query(client, sql, params);
	}

	static deleteOne(client, table_name, id_name)
	{
		return Func.deleteData(client, data, table_name, "WHERE id_name = $1", [data[id_name]]);
	}
	
	static updateData(client, data, tableName, whereSql, params)
    {
        var i = new ParamsIterator();
        var sql = "UPDATE " + tableName + " SET ";

        // names
        var first = true;
        for (var n in data)
        {
            if (!first) sql += ",";
            first = false;
			sql += n + " = ";
			sql += i.n(data[n]);
        }

		whereSql = i.convertQuery(whereSql);
		for(var p in params)
		{
			i.n(params[p]);
		}

		sql += " " + whereSql;

		/*Func.log(sql);
		Func.log(i.params);
*/
		return Func.query(client, sql, i.params);
	}
	
	static updateOne(client, data, table_name, id_name)
	{
		return Func.updateData(client, data, table_name, "WHERE id_name = $1", [data[id_name]]);
	}
	
	static log(text)
	{
		var stringify = JSON.stringify(text);
		if (!stringify) return;
		if (stringify.length > 100) return;
		fs.appendFile("log.txt", text + "\n", function (err,data) { if (err) { return console.log(err); }});
		console.log(text);
	}
	
	static myTrim(x) {
		var text = '';
		for (var i = 0; i < x.length; i++)
		{
			var c = x[i];
			if (c != ' ')
			{
				text += c;
			}				
		}
		return text;
		
		//return x.replace(/^\s+|\s+$/gm,'');
	}
}

class ParamsIterator
{
    i = 0;
    params = [];

    n(value)
    {
        this.i++;
        this.params.push(value);
        return "$" + this.i;
	}
	
	convertQuery(query)
	{
		var newQuery = "";

		var start = false; 
		var number = "";

		for(var i in query)
		{
			if (query[i] == '$')
			{
				newQuery += query[i];
				start = true;
				continue;
			}

			if (query[i] >= '0' && query[i] <= '9')
			{
				number += query[i];
			}else
			{
				// character
				if (start)
				{
					start = false;
					// convert number
					number = parseInt(number, 10);
					number += this.i;
					newQuery += number;
					number = "";			
				}

				newQuery += query[i];
			}
		}

		if (start)
		{
			// add final number
			number = parseInt(number, 10);
			number += this.i;
			newQuery += number;
		}

		return newQuery;
	} 

}

module.exports.Func = Func;
module.exports.ParamsIterator = ParamsIterator;