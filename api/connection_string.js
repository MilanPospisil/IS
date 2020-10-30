const { Client } = require('pg');

var client = new Client({
			user: 'postgres',
			host: 'localhost',
			database: 'is',
			password: 'pg',
			port: 5432,
        });
        
module.exports.client = client;
	