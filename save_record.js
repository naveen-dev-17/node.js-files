function save_record(db_connection)
{
    return function(request, response)
    {
        const { table, data, id, primaryKey } = request.body;

        if (id && id !== "null")
        {
            update_record(db_connection, response, table, data, id, primaryKey);
        }
        else
        {
            insert_record(db_connection, response, table, data);
        }
    };
}

function update_record(db_connection, response, table, data, id, primaryKey)
{
    const keys = Object.keys(data).filter(key => key !== primaryKey);
    const setClause = keys.map(key => `\`${key}\`=?`).join(", ");
    const values = keys.map(key => data[key]);
    values.push(id);

    db_connection.query(
        `UPDATE \`${table}\` SET ${setClause} WHERE \`${primaryKey}\`=?`,
        values,
        (err, result) =>
        {
            if (err) return response.send(err.message);
            response.send(responseult.affectedRows > 0 ? "Updated" : "Update Failed");
        }
    );
}

function insert_record(db_connection, response, table, data)
{
    const keys = Object.keys(data);
    const columns = keys.map(k => `\`${k}\``).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map(k => data[k]);

    db_connection.query(
        `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`,
        values,
        (err, result) =>
        {
            if (err) return response.send(err.message);
            response.send(result.affectedRows > 0 ? "Inserted" : "Insert Failed");
        }
    );
}

module.exports = save_record;