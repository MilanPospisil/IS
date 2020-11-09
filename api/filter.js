
const { Func } = require('./func.js');

class Filter {
    /*
        query - query of the client (informations from client, beware of SQL injection!)
        inner_query - inner query of the server
        inner_params - parameters of the server
        entity_schema - schema of the entity we want to query (check for SQL injection)
    */
    /*
         query example
             select [array of columns we want to select]
             order_by [array of columns, -before column name means descending]
             paging - {offset, limit}
    */
    static filter(client, query, inner_query, inner_params, entity_schema) {
        try {
            var select = query.select;
            var order_by = query.order_by;
            var paging = query.paging;
            //var filter = query.filter;    // TODO

            // check select
            if (select == null || select.length == 0) {
                // add all columns
                select = [];
                for (var f in entity_schema)
                {
                    var f = entity_schema[f];
                    select.push(f);
                }
            }

            for (var c in select) {
                c = select[c];
                if (!entity_schema[c]) {
                    return { success: false, error: "field " + s + " is not in entity schema." };
                }
            }

            // check order_by
            if (!order_by) order_by = [];

            for (var c in order_by) {
                c = order_by[c];
                if (c[0] == '-') c = c.substring(1, c.length);
                if (!entity_schema[c]) {
                    return { success: false, error: "field " + s + " is not in entity schema." };
                }
            }

            // check paging
            if (paging) {
                if (paging.offset && !Number.isInteger(paging.offset)) {
                    return { success: false, error: "page offset is not number." };
                }

                if (paging.limit && !Number.isInteger(paging.limit)) {
                    return { success: false, error: "page limit is not number." };
                }
            }

            // build select
            var sql = "SELECT ";
            for (var c in select) {
                if (c > 0) sql += ", ";
                var c = select[c];
                sql += c + " ";
            }

            // inner query
            sql += " FROM (" + inner_query + ") AS core ";

            // build order by
            if (order_by && order_by.length > 0) {
                sql += " ORDER BY ";
                for (var c in order_by) {
                    if (c > 0) sql += ", ";
                    c = order_by[c];

                    var is_descending = false;
                    if (c[0] == '-') {
                        is_descending = true;
                        c = c.substring(1, c.length);
                    }

                    sql += c;
                    if (is_descending) {
                        sql += " DESC";
                    } else {
                        sql += " ASC";
                    }
                }
            }

            // build paging
            if (paging) {
                if (paging.offset) {
                    sql += " OFFSET " + paging.offset;
                }

                if (paging.limit) {
                    sql += " LIMIT " + paging.limit;
                }
            }

            sql += ";";

            return Func.query(client, sql, inner_params)
            .then((res) => 
            {
                return res;
            });
        }
        catch (err) {
            Func.log(err);
        }

    }

}

module.exports.Filter = Filter;